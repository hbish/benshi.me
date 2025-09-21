import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'

export async function GET(context) {
  const posts = await getCollection('posts')

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date) - new Date(a.data.date)
  )

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: sortedPosts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description || post.data.title,
      author: post.data.author || 'Ben Shi',
      link: `/${post.slug}/`,
      ...(post.data.tags && {
        categories: post.data.tags,
      }),
    })),
    customData: `<language>en-us</language>`,
  })
}
