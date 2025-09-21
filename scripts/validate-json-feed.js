#!/usr/bin/env node

import fs from 'fs'

const JSON_FEED_PATH = './dist/feed.json'

/**
 * Validates JSON Feed structure and content
 */
async function validateJSONFeed() {
  console.log('🔍 Validating JSON Feed...\n')

  // Check if JSON feed file exists
  if (!fs.existsSync(JSON_FEED_PATH)) {
    console.error('❌ JSON Feed file not found at:', JSON_FEED_PATH)
    console.log('💡 Run `pnpm build` first to generate the JSON feed')
    process.exit(1)
  }

  const jsonContent = fs.readFileSync(JSON_FEED_PATH, 'utf8')
  const validationResults = {
    jsonValid: false,
    feedValid: false,
    issues: [],
    warnings: [],
    success: [],
  }

  // 1. JSON Structure Validation
  console.log('1️⃣ Validating JSON structure...')
  try {
    const feed = JSON.parse(jsonContent)
    validationResults.jsonValid = true
    validationResults.success.push('✅ JSON structure is valid')

    // 2. JSON Feed Format Validation
    console.log('2️⃣ Validating JSON Feed format...')

    // Check required fields according to JSON Feed spec
    const requiredFields = ['version', 'title']
    for (const field of requiredFields) {
      if (!feed[field]) {
        validationResults.issues.push(`❌ Missing required field: ${field}`)
      } else {
        validationResults.success.push(`✅ Feed has ${field}: "${feed[field]}"`)
      }
    }

    // Check version format
    if (
      feed.version &&
      !feed.version.startsWith('https://jsonfeed.org/version/')
    ) {
      validationResults.issues.push('❌ Invalid version format')
    }

    // Check recommended fields
    const recommendedFields = ['home_page_url', 'feed_url', 'description']
    for (const field of recommendedFields) {
      if (!feed[field]) {
        validationResults.warnings.push(
          `⚠️  Missing recommended field: ${field}`
        )
      } else {
        validationResults.success.push(`✅ Feed has ${field}`)
      }
    }

    // 3. Items Validation
    console.log('3️⃣ Validating feed items...')
    if (!feed.items || !Array.isArray(feed.items)) {
      validationResults.issues.push('❌ Feed items must be an array')
    } else if (feed.items.length === 0) {
      validationResults.warnings.push('⚠️  Feed has no items')
    } else {
      validationResults.success.push(
        `✅ Feed contains ${feed.items.length} items`
      )

      // Check first few items
      const itemsToCheck = Math.min(3, feed.items.length)
      for (let i = 0; i < itemsToCheck; i++) {
        const item = feed.items[i]

        // Each item must have id
        if (!item.id) {
          validationResults.issues.push(
            `❌ Item ${i + 1} missing required field: id`
          )
        }

        // Must have either content_html or content_text
        if (!item.content_html && !item.content_text) {
          validationResults.warnings.push(
            `⚠️  Item ${i + 1} missing content (content_html or content_text)`
          )
        }

        // Check date format
        if (item.date_published) {
          try {
            new Date(item.date_published).toISOString()
          } catch {
            validationResults.warnings.push(
              `⚠️  Item ${i + 1} has invalid date format: ${item.date_published}`
            )
          }
        }
      }
    }

    // 4. Check for best practices
    console.log('4️⃣ Checking JSON Feed best practices...')

    if (feed.language) {
      validationResults.success.push(`✅ Feed has language: ${feed.language}`)
    } else {
      validationResults.warnings.push('⚠️  Feed missing language specification')
    }

    if (
      feed.authors &&
      Array.isArray(feed.authors) &&
      feed.authors.length > 0
    ) {
      validationResults.success.push(
        `✅ Feed has ${feed.authors.length} author(s)`
      )
    } else {
      validationResults.warnings.push('⚠️  Feed missing authors')
    }

    validationResults.feedValid = validationResults.issues.length === 0
  } catch (error) {
    validationResults.issues.push(`❌ JSON parsing error: ${error.message}`)
  }

  // 5. Report Results
  console.log('\n📊 JSON Feed Validation Results:')
  console.log('==================================\n')

  if (validationResults.success.length > 0) {
    console.log('✅ Successes:')
    validationResults.success.forEach(msg => console.log(`   ${msg}`))
    console.log('')
  }

  if (validationResults.warnings.length > 0) {
    console.log('⚠️  Warnings:')
    validationResults.warnings.forEach(msg => console.log(`   ${msg}`))
    console.log('')
  }

  if (validationResults.issues.length > 0) {
    console.log('❌ Issues:')
    validationResults.issues.forEach(msg => console.log(`   ${msg}`))
    console.log('')
  }

  // 6. Final Status
  const isValid = validationResults.jsonValid && validationResults.feedValid

  if (isValid) {
    console.log('🎉 JSON Feed validation PASSED!')
    console.log('\n💡 You can test your JSON feed:')
    console.log('   • JSON Feed Validator: https://validator.jsonfeed.org/')
    console.log('   • Feed readers that support JSON Feed will auto-detect it')
  } else {
    console.log('💥 JSON Feed validation FAILED!')
    console.log('   Please fix the issues above before publishing.')
    process.exit(1)
  }
}

// Run validation
validateJSONFeed().catch(error => {
  console.error('💥 Validation script error:', error)
  process.exit(1)
})
