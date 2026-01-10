/**
 * Extracts the first image from markdown content
 * @param content - The markdown content to parse
 * @returns The image path or null if no image found
 */
export function extractFirstImage(content: string): string | null {
  // Regex to match markdown image syntax: ![alt](path)
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/
  const match = content.match(imageRegex)

  if (match && match[2]) {
    return match[2]
  }

  return null
}
