import { z, defineCollection } from 'astro:content';

const postCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        author: z.string(),
        description: z.string().optional(),
        draft: z.boolean().default(false),
        // Transform string to Date object
        date: z
            .string()
            .or(z.date())
            .transform((val) => new Date(val)),
        //heroImage: z.string().optional(),
        minutesRead: z.string().optional(),
    }),
});

export const collections = {
    'posts': postCollection
};

