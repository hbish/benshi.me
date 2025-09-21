#!/usr/bin/env node

import { XMLValidator } from 'fast-xml-parser'
import Parser from 'rss-parser'
import fs from 'fs'

const RSS_PATH = './dist/rss.xml'

/**
 * Validates RSS feed structure and content
 */
async function validateRSSFeed() {
  console.log('🔍 Validating RSS feed...\n')

  // Check if RSS file exists
  if (!fs.existsSync(RSS_PATH)) {
    console.error('❌ RSS file not found at:', RSS_PATH)
    console.log('💡 Run `pnpm build` first to generate the RSS feed')
    process.exit(1)
  }

  const rssContent = fs.readFileSync(RSS_PATH, 'utf8')
  const validationResults = {
    xmlValid: false,
    rssValid: false,
    issues: [],
    warnings: [],
    success: [],
  }

  // 1. XML Structure Validation
  console.log('1️⃣ Validating XML structure...')
  const xmlValidation = XMLValidator.validate(rssContent)

  if (xmlValidation === true) {
    validationResults.xmlValid = true
    validationResults.success.push('✅ XML structure is valid')
  } else {
    validationResults.issues.push(
      `❌ XML validation error: ${xmlValidation.err.msg}`
    )
  }

  // 2. RSS Format Validation using rss-parser
  console.log('2️⃣ Validating RSS format...')
  try {
    const parser = new Parser({
      customFields: {
        item: ['category', 'author', 'guid'],
      },
    })

    const feed = await parser.parseString(rssContent)
    validationResults.rssValid = true
    validationResults.success.push('✅ RSS format is valid')

    // 3. Content Validation
    console.log('3️⃣ Validating RSS content...')

    // Check required feed fields
    const requiredFeedFields = ['title', 'description', 'link']
    for (const field of requiredFeedFields) {
      if (!feed[field]) {
        validationResults.issues.push(
          `❌ Missing required feed field: ${field}`
        )
      } else {
        validationResults.success.push(`✅ Feed has ${field}: "${feed[field]}"`)
      }
    }

    // Check items
    if (!feed.items || feed.items.length === 0) {
      validationResults.issues.push('❌ RSS feed has no items')
    } else {
      validationResults.success.push(
        `✅ Feed contains ${feed.items.length} items`
      )

      // Check first few items for required fields
      const requiredItemFields = ['title', 'link', 'pubDate']
      const itemsToCheck = Math.min(3, feed.items.length)

      for (let i = 0; i < itemsToCheck; i++) {
        const item = feed.items[i]
        for (const field of requiredItemFields) {
          if (!item[field]) {
            validationResults.warnings.push(
              `⚠️  Item ${i + 1} missing ${field}`
            )
          }
        }

        // Check if dates are valid
        if (item.pubDate) {
          const date = new Date(item.pubDate)
          if (isNaN(date.getTime())) {
            validationResults.warnings.push(
              `⚠️  Item ${i + 1} has invalid date: ${item.pubDate}`
            )
          }
        }
      }
    }

    // Check for best practices
    console.log('4️⃣ Checking RSS best practices...')

    if (feed.language) {
      validationResults.success.push(`✅ Feed has language: ${feed.language}`)
    } else {
      validationResults.warnings.push('⚠️  Feed missing language specification')
    }

    if (feed.lastBuildDate) {
      validationResults.success.push(
        `✅ Feed has lastBuildDate: ${feed.lastBuildDate}`
      )
    } else {
      validationResults.warnings.push('⚠️  Feed missing lastBuildDate')
    }

    // Check for proper GUID usage
    const itemsWithGuid = feed.items.filter(item => item.guid).length
    if (itemsWithGuid === feed.items.length) {
      validationResults.success.push('✅ All items have GUIDs')
    } else {
      validationResults.warnings.push(
        `⚠️  ${feed.items.length - itemsWithGuid} items missing GUIDs`
      )
    }

    // Check for categories/tags
    const itemsWithCategories = feed.items.filter(
      item => item.categories && item.categories.length > 0
    ).length
    if (itemsWithCategories > 0) {
      validationResults.success.push(
        `✅ ${itemsWithCategories} items have categories`
      )
    } else {
      validationResults.warnings.push('⚠️  No items have categories')
    }
  } catch (error) {
    validationResults.issues.push(`❌ RSS parsing error: ${error.message}`)
  }

  // 5. Report Results
  console.log('\n📊 Validation Results:')
  console.log('========================\n')

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
  const isValid =
    validationResults.xmlValid &&
    validationResults.rssValid &&
    validationResults.issues.length === 0

  if (isValid) {
    console.log('🎉 RSS feed validation PASSED!')
    console.log('\n💡 You can test your feed in RSS readers:')
    console.log(
      '   • Feedly: https://feedly.com/i/discover/sources/search/feed/YOUR_SITE_URL/rss.xml'
    )
    console.log('   • Feed Validator: https://validator.w3.org/feed/')
    console.log('   • RSS Viewer: https://rss-viewer.com/')
  } else {
    console.log('💥 RSS feed validation FAILED!')
    console.log('   Please fix the issues above before publishing.')
    process.exit(1)
  }
}

// Run validation
validateRSSFeed().catch(error => {
  console.error('💥 Validation script error:', error)
  process.exit(1)
})
