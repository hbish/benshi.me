import { visit } from 'unist-util-visit'

export function remarkOptimizeImages() {
  return function (tree) {
    visit(tree, 'image', node => {
      const originalUrl = node.url

      // Skip external images (already handled by domains config)
      if (originalUrl.startsWith('http')) {
        return
      }

      // For local images, add loading and decoding attributes
      if (!node.data) {
        node.data = {}
      }

      if (!node.data.hProperties) {
        node.data.hProperties = {}
      }

      // Add optimized loading attributes
      node.data.hProperties = {
        ...node.data.hProperties,
        loading: 'lazy',
        decoding: 'async',
        style: 'max-width: 100%; height: auto;',
      }

      // Ensure alt text exists for accessibility
      if (!node.alt || node.alt.trim() === '') {
        // Extract filename from URL for basic alt text
        const filename = originalUrl.split('/').pop().split('.')[0]
        node.alt = filename.replace(/-/g, ' ').replace(/_/g, ' ')
      }
    })

    // Also handle HTML img tags in markdown
    visit(tree, 'html', node => {
      if (node.value.includes('<img')) {
        // Add loading="lazy" and decoding="async" to img tags
        node.value = node.value.replace(
          /<img([^>]*?)(?:\s+loading="[^"]*")?(?:\s+decoding="[^"]*")?([^>]*?)>/g,
          '<img$1 loading="lazy" decoding="async"$2>'
        )

        // Ensure max-width style for responsive images
        if (!node.value.includes('style=')) {
          node.value = node.value.replace(
            /<img([^>]*?)>/g,
            '<img$1 style="max-width: 100%; height: auto;">'
          )
        }
      }
    })
  }
}
