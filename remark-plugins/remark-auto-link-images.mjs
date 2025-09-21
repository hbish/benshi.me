import { visit } from 'unist-util-visit'

export function remarkAutoLinkImages() {
  return function (tree) {
    visit(tree, 'image', (node, index, parent) => {
      // Only wrap standalone images (not already inside links)
      if (parent && parent.type !== 'link') {
        // Create a link node that wraps the image
        const linkNode = {
          type: 'link',
          url: node.url,
          title: node.title || null,
          children: [node],
        }

        // Replace the image node with the link node
        parent.children[index] = linkNode
      }
    })
  }
}
