#!/usr/bin/env node

/**
 * Upload photos to Cloudflare R2 and generate Astro content collection entries.
 *
 * Usage:
 *   node scripts/upload-photos.js [directory]
 *
 * Environment variables:
 *   CLOUDFLARE_ACCOUNT_ID - Cloudflare account ID
 *   R2_ACCESS_KEY_ID - R2 API token Access Key ID
 *   R2_SECRET_ACCESS_KEY - R2 API token Secret Access Key
 *
 * The script will:
 * 1. Find all images in the specified directory
 * 2. Upload each image to Cloudflare R2 bucket 'benshi-photos'
 * 3. Generate an .mdx file for each photo in src/content/photos/
 */

import { readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'

// Load environment variables from .env in project root
const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
dotenv.config({ path: join(projectRoot, '.env') })

const IMAGE_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.svg',
  '.avif',
  '.heic',
]

// Content-Type mapping for image extensions
const CONTENT_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.heic': 'image/heic',
}

// R2 bucket name
const BUCKET_NAME = 'benshi-photos'

// Get R2 credentials from environment
function getCredentials() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  const accessKeyId = process.env.R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY

  if (!accountId) {
    throw new Error(
      'CLOUDFLARE_ACCOUNT_ID not set. Add it to .env or run: export CLOUDFLARE_ACCOUNT_ID=your_account_id'
    )
  }

  if (!accessKeyId) {
    throw new Error(
      'R2_ACCESS_KEY_ID not set. Add it to .env or run: export R2_ACCESS_KEY_ID=your_access_key_id\n' +
        'Create R2 API token at: https://dash.cloudflare.com/profile/api-tokens'
    )
  }

  if (!secretAccessKey) {
    throw new Error(
      'R2_SECRET_ACCESS_KEY not set. Add it to .env or run: export R2_SECRET_ACCESS_KEY=your_secret_key\n' +
        'Create R2 API token at: https://dash.cloudflare.com/profile/api-tokens'
    )
  }

  return { accountId, accessKeyId, secretAccessKey }
}

// Create S3 client configured for R2
function createS3Client({ accountId, accessKeyId, secretAccessKey }) {
  return new S3Client({
    region: 'auto', // Required by SDK but not used by R2
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })
}

// Get all image files from directory
async function getImageFiles(directory) {
  if (!existsSync(directory)) {
    throw new Error(`Directory not found: ${directory}`)
  }

  const entries = await readdir(directory, { withFileTypes: true })
  const images = []

  for (const entry of entries) {
    if (entry.isFile()) {
      const ext = entry.name.toLowerCase().slice(entry.name.lastIndexOf('.'))
      if (IMAGE_EXTENSIONS.includes(ext)) {
        images.push(join(directory, entry.name))
      }
    }
  }

  return images.sort()
}

// Upload image to R2
async function uploadImage(filePath, s3Client) {
  const fileName = filePath.split('/').pop()
  const fileBuffer = await readFile(filePath)
  const ext = fileName.toLowerCase().slice(fileName.lastIndexOf('.'))
  const contentType = CONTENT_TYPES[ext] || 'image/jpeg'

  // Use filename as the R2 object key (can include subdirectories like "photos/sample.jpg")
  const key = `photos/${fileName}`

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  })

  await s3Client.send(command)

  return { key, fileName }
}

// Generate slug from filename
function generateSlug(fileName) {
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '')
  return nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Generate title from filename
function generateTitle(fileName) {
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '')
  return nameWithoutExt
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}

// Create .mdx file for photo
async function createPhotoEntry(imageData, filePath) {
  const fileName = filePath.split('/').pop()
  const slug = generateSlug(fileName)
  const title = generateTitle(fileName)
  const now = new Date().toISOString()

  const content = `---
id: ${imageData.key}
title: ${title}
description: '${title} photo'
collection: sample
date: ${now.split('T')[0]}
tags:
  - sample
draft: false
---

${title}

`

  const contentDir = 'src/content/photos'
  if (!existsSync(contentDir)) {
    mkdirSync(contentDir, { recursive: true })
  }

  const outputPath = join(contentDir, `${slug}.mdx`)

  if (existsSync(outputPath)) {
    console.log(`  ⚠️  File already exists: ${outputPath} (skipping)`)
    return outputPath
  }

  await writeFile(outputPath, content, 'utf-8')
  return outputPath
}

// Main upload function
async function uploadPhotos(directory = 'scripts/sample-photos') {
  console.log('📸 Cloudflare R2 Upload Script')
  console.log(`📁 Directory: ${directory}`)
  console.log()

  // Get credentials
  const credentials = getCredentials()
  console.log(`✅ Credentials loaded for account: ${credentials.accountId}`)
  console.log(`🪣 Bucket: ${BUCKET_NAME}`)
  console.log()

  // Create S3 client
  const s3Client = createS3Client(credentials)

  // Get image files
  const images = await getImageFiles(directory)
  console.log(`🖼️  Found ${images.length} image(s)`)
  console.log()

  if (images.length === 0) {
    console.log(
      '⚠️  No images found. Add images to the directory and run again.'
    )
    return
  }

  // Upload each image
  const results = []
  for (let i = 0; i < images.length; i++) {
    const imagePath = images[i]
    const fileName = imagePath.split('/').pop()

    console.log(`[${i + 1}/${images.length}] Uploading: ${fileName}`)

    try {
      const result = await uploadImage(imagePath, s3Client)
      console.log(`  ✅ Uploaded! Key: ${result.key}`)
      console.log(`  🌐 CDN URL: https://photos.benshi.me/${result.key}`)

      // Create content entry
      const entryPath = await createPhotoEntry(result, imagePath)
      console.log(`  📝 Created: ${entryPath}`)

      results.push({
        fileName,
        key: result.key,
        cdnUrl: `https://photos.benshi.me/${result.key}`,
        entryPath,
      })
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}`)
      results.push({
        fileName,
        error: error.message,
      })
    }

    console.log()
  }

  // Summary
  console.log('═══════════════════════════════════════')
  console.log('📊 Upload Summary')
  console.log('═══════════════════════════════════════')

  const successful = results.filter(r => !r.error)
  const failed = results.filter(r => r.error)

  console.log(`✅ Successful: ${successful.length}`)
  console.log(`❌ Failed: ${failed.length}`)

  if (failed.length > 0) {
    console.log()
    console.log('Failed uploads:')
    failed.forEach(r => {
      console.log(`  - ${r.fileName}: ${r.error}`)
    })
  }

  console.log()
  console.log('🎉 Done! Photo entries created in src/content/photos/')
  console.log(`📸 Access photos at: https://photos.benshi.me/photos/<filename>`)
}

// Run script
const directory = process.argv[2] || 'scripts/sample-photos'

uploadPhotos(directory).catch(error => {
  console.error('❌ Fatal error:', error.message)
  process.exit(1)
})
