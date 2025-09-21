import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

import { remarkReadingTime } from './remark-plugins/remark-reading-time.mjs'
import { remarkAutoLinkImages } from './remark-plugins/remark-auto-link-images.mjs'
import { remarkOptimizeImages } from './remark-plugins/remark-optimize-images.mjs'

// https://astro.build/config
export default defineConfig({
  site: 'https://hbish.com',
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    remarkPlugins: [
      remarkReadingTime,
      remarkAutoLinkImages,
      remarkOptimizeImages,
    ],
  },
  image: {
    // Enable modern image formats and optimization
    formats: ['avif', 'webp', 'png', 'jpg'],
    domains: ['hbish.com', 'asciinema.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.hbish.com',
      },
      {
        protocol: 'https',
        hostname: 'asciinema.org',
      },
    ],
    // Optimize image generation for different screen sizes
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: 268402689, // ~16K x 16K pixels
      },
    },
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
