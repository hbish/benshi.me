import { defineCollection, z } from 'astro:content'

const postCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    type: z.literal('post').optional(),
    date: z
      .string()
      .or(z.date())
      .transform(val => new Date(val)),
    slug: z.string().optional(),
    tags: z.array(z.string()).optional(),
    minutesRead: z.string().optional(),
    image: z.string().optional(),
    socialImage: z.string().optional(),
  }),
})

const pageCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string().optional(),
    type: z.literal('page').optional(),
    slug: z.string().optional(),
    draft: z.boolean().default(false),
  }),
})

const noteCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string().optional(),
    type: z.literal('note').optional(),
    date: z
      .string()
      .or(z.date())
      .transform(val => new Date(val)),
    slug: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    minutesRead: z.string().optional(),
    image: z.string().optional(),
    socialImage: z.string().optional(),
  }),
})

const photoCollection = defineCollection({
  schema: z.object({
    id: z.string(), // Cloudflare image ID
    title: z.string(),
    description: z.string().optional(),
    collection: z.string(), // album name
    tags: z.array(z.string()).optional(),
    date: z
      .string()
      .or(z.date())
      .transform(val => new Date(val)),
    width: z.number().optional(),
    height: z.number().optional(),
    draft: z.boolean().default(false),
  }),
})

export const collections = {
  posts: postCollection,
  pages: pageCollection,
  notes: noteCollection,
  photos: photoCollection,
}
