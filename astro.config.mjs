import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

import { remarkReadingTime } from './remark-plugins/remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
    site: 'https://hbish.com',
    integrations: [
        mdx(),
        sitemap(),
        tailwind(),
    ],
    markdown: {
        remarkPlugins: [remarkReadingTime]
    },
});