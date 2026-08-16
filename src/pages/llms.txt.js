import { getCollection } from 'astro:content'
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'

// llms.txt: a markdown overview of the site for LLMs, per https://llmstxt.org
export async function GET() {
  const site = 'https://hbish.com'

  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => new Date(b.data.date) - new Date(a.data.date)
  )

  const lines = []

  lines.push(`# ${SITE_TITLE} (hbish.com)`)
  lines.push('')
  lines.push(
    `> ${SITE_DESCRIPTION}. Topics span engineering leadership, Java and web performance, tooling, and career reflections.`
  )
  lines.push('')
  lines.push('## Pages')
  lines.push('')
  lines.push(`- [About](${site}/about/): Who Ben Shi is and what he is up to`)
  lines.push(`- [Writing](${site}/writing/): Index of all blog posts`)
  lines.push(
    `- [Notes](${site}/notes/): Short technical notes and how-tos collected over the years`
  )
  lines.push(
    `- [Archive](${site}/archive/): Chronological archive of everything published`
  )
  lines.push(`- [Now](${site}/now/): What Ben is focused on right now`)
  lines.push(`- [Uses](${site}/uses/): Tools and gear Ben uses for development`)
  lines.push(`- [Work](${site}/work/): Professional and personal work`)
  lines.push(`- [Photos](${site}/photos/): Photo albums and collections`)
  lines.push('')
  lines.push('## Posts')
  lines.push('')

  for (const post of posts) {
    const desc = post.data.description || post.data.title
    const date = post.data.date.toISOString().slice(0, 10)
    lines.push(
      `- [${post.data.title}](${site}/${post.slug}/): ${desc} (${date})`
    )
  }

  lines.push('')
  lines.push('## Feeds')
  lines.push('')
  lines.push(`- [RSS](${site}/rss.xml): Full-content RSS feed`)
  lines.push(`- [JSON Feed](${site}/feed.json): Full-content JSON feed`)
  lines.push(
    `- [llms-full.txt](${site}/llms-full.txt): Full text of all posts in markdown`
  )

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
