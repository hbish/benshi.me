import { getCollection } from 'astro:content'
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'

// llms-full.txt: full text of every post in markdown, per https://llmstxt.org
export async function GET() {
  const site = 'https://hbish.com'

  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => new Date(b.data.date) - new Date(a.data.date)
  )

  const parts = []

  parts.push(`# ${SITE_TITLE} (hbish.com) - full content`)
  parts.push('')
  parts.push(`> ${SITE_DESCRIPTION}. Full text of all published posts follows.`)
  parts.push('')

  for (const post of posts) {
    const date = post.data.date.toISOString().slice(0, 10)
    parts.push(`---`)
    parts.push('')
    parts.push(`# ${post.data.title}`)
    parts.push('')
    parts.push(`URL: ${site}/${post.slug}/`)
    parts.push(`Published: ${date}`)
    if (post.data.updated) {
      parts.push(`Updated: ${post.data.updated.toISOString().slice(0, 10)}`)
    }
    if (post.data.tags?.length) {
      parts.push(`Tags: ${post.data.tags.join(', ')}`)
    }
    parts.push('')
    parts.push(post.body || '')
    parts.push('')
  }

  return new Response(parts.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
