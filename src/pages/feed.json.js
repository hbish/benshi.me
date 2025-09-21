import { getCollection } from 'astro:content'
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'

export async function GET(context) {
  const posts = await getCollection('posts')

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date) - new Date(a.data.date)
  )

  // JSON Feed format
  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: SITE_TITLE,
    home_page_url: context.site?.toString(),
    feed_url: `${context.site}feed.json`,
    description: SITE_DESCRIPTION,
    language: 'en-US',
    authors: [
      {
        name: 'Ben Shi',
        url: context.site?.toString(),
        avatar: `${context.site}android-chrome-192x192.png`,
      },
    ],
    items: sortedPosts.map(post => ({
      id: `${context.site}${post.slug}/`,
      url: `${context.site}${post.slug}/`,
      title: post.data.title,
      content_text: post.data.description || post.data.title,
      summary: post.data.description || post.data.title,
      date_published: post.data.date.toISOString(),
      author: {
        name: post.data.author || 'Ben Shi',
      },
      ...(post.data.tags && {
        tags: post.data.tags,
      }),
    })),
  }

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}
