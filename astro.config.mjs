import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

import { remarkReadingTime } from './remark-plugins/remark-reading-time.mjs'
import { remarkAutoLinkImages } from './remark-plugins/remark-auto-link-images.mjs'

// https://astro.build/config
export default defineConfig({
  site: 'https://hbish.com',
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkAutoLinkImages],
  },
  image: {
    // Enable image optimization for better performance
    domains: ['hbish.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.hbish.com',
      },
    ],
  },
  build: {
    // Inline small assets for better performance
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      // Enable CSS code splitting for better loading
      cssCodeSplit: true,
    },
  },
})
