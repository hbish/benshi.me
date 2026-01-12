#!/usr/bin/env node

/**
 * Upload photos to Cloudflare Images and generate Astro content collection entries.
 *
 * Usage:
 *   node scripts/upload-photos.js [directory]
 *
 * Environment variables:
 *   CLOUDFLARE_ACCOUNT_ID - Cloudflare account ID
 *   CLOUDFLARE_API_TOKEN - Cloudflare API token with Images:Edit permission
 *
 * The script will:
 * 1. Find all images in the specified directory
 * 2. Upload each image to Cloudflare Images
 * 3. Generate an .mdx file for each photo in src/content/photos/
 */

import { readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

// Load environment variables from .env in project root
const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
dotenv.config({ path: join(projectRoot, '.env') })

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']

// Get Cloudflare credentials from environment
function getCredentials() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  const apiToken = process.env.CLOUDFLARE_API_TOKEN

  if (!accountId) {
    throw new Error(
      'CLOUDFLARE_ACCOUNT_ID not set. Add it to .env or run: export CLOUDFLARE_ACCOUNT_ID=your_account_id'
    )
  }

  if (!apiToken) {
    throw new Error(
      'CLOUDFLARE_API_TOKEN not set. Add it to .env or run: export CLOUDFLARE_API_TOKEN=your_token\n' +
        'Create token at: https://dash.cloudflare.com/profile/api-tokens'
    )
  }

  return { accountId, apiToken }
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

// Upload image to Cloudflare Images
async function uploadImage(filePath, { accountId, apiToken }) {
  const fileName = filePath.split('/').pop()
  const fileBuffer = await readFile(filePath)
  const fileBlob = new Blob([fileBuffer])

  const formData = new FormData()
  formData.append('file', fileBlob, fileName)

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      body: formData,
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Upload failed for ${fileName}: ${response.status} ${errorText}`
    )
  }

  const data = await response.json()

  if (!data.success) {
    throw new Error(
      `Upload failed for ${fileName}: ${JSON.stringify(data.errors)}`
    )
  }

  return data.result
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
id: ${imageData.id}
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
  console.log('📸 Cloudflare Images Upload Script')
  console.log(`📁 Directory: ${directory}`)
  console.log()

  // Get credentials
  const credentials = getCredentials()
  console.log(`✅ Credentials loaded for account: ${credentials.accountId}`)
  console.log()

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
      const result = await uploadImage(imagePath, credentials)
      console.log(`  ✅ Uploaded! ID: ${result.id}`)
      console.log(`  🌐 URL: ${result.variant || result.filename}`)

      // Create content entry
      const entryPath = await createPhotoEntry(result, imagePath)
      console.log(`  📝 Created: ${entryPath}`)

      results.push({
        fileName,
        id: result.id,
        url: result.variant || result.filename,
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
}

// Run script
const directory = process.argv[2] || 'scripts/sample-photos'

uploadPhotos(directory).catch(error => {
  console.error('❌ Fatal error:', error.message)
  process.exit(1)
})
