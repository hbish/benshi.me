#!/usr/bin/env node

import { spawn } from 'child_process'
import fs from 'fs'

/**
 * Runs feed validation for both RSS and JSON feeds
 */
async function validateAllFeeds() {
  console.log('🚀 Starting comprehensive feed validation...\n')

  // Check if build exists
  if (!fs.existsSync('./dist')) {
    console.log('📦 Building site first...')
    await runCommand('pnpm', ['build'])
    console.log('')
  }

  let allPassed = true

  try {
    // Validate RSS feed
    console.log('🔸 Validating RSS feed...')
    await runCommand('node', ['scripts/validate-rss.js'])
    console.log('✅ RSS validation completed\n')
  } catch {
    console.log('❌ RSS validation failed\n')
    allPassed = false
  }

  try {
    // Validate JSON feed
    console.log('🔸 Validating JSON feed...')
    await runCommand('node', ['scripts/validate-json-feed.js'])
    console.log('✅ JSON Feed validation completed\n')
  } catch {
    console.log('❌ JSON Feed validation failed\n')
    allPassed = false
  }

  // Online validation tests
  console.log('🌐 Online validation recommendations:')
  console.log('=====================================\n')
  console.log('📝 RSS Feed:')
  console.log('   • W3C Feed Validator: https://validator.w3.org/feed/')
  console.log('   • FeedValidator.org: https://www.feedvalidator.org/')
  console.log('')
  console.log('📝 JSON Feed:')
  console.log('   • JSON Feed Validator: https://validator.jsonfeed.org/')
  console.log('')
  console.log('🧪 Test in RSS readers:')
  console.log('   • Feedly: https://feedly.com')
  console.log('   • Inoreader: https://www.inoreader.com')
  console.log('   • NetNewsWire: https://netnewswire.com')
  console.log('   • Reeder: https://reederapp.com')
  console.log('')

  if (allPassed) {
    console.log('🎉 All feed validations PASSED!')
    console.log('Your feeds are ready for production! 🚀')
  } else {
    console.log('💥 Some feed validations FAILED!')
    console.log('Please check the errors above and fix them.')
    process.exit(1)
  }
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' })

    child.on('close', code => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Command failed with exit code ${code}`))
      }
    })

    child.on('error', reject)
  })
}

// Run validation
validateAllFeeds().catch(error => {
  console.error('💥 Feed validation script error:', error)
  process.exit(1)
})
