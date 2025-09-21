import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'

export async function GET(context) {
  const posts = await getCollection('posts')

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date) - new Date(a.data.date)
  )

  // Get the latest post date for lastBuildDate
  const latestPostDate =
    sortedPosts.length > 0 ? sortedPosts[0].data.date : new Date()

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
    customData: `<language>en-us</language>
    <lastBuildDate>${latestPostDate.toUTCString()}</lastBuildDate>
    <managingEditor>benshi@hbish.com (Ben Shi)</managingEditor>
    <webMaster>benshi@hbish.com (Ben Shi)</webMaster>
    <ttl>1440</ttl>
    <generator>Astro v4.x with @astrojs/rss</generator>`,
  })
}
