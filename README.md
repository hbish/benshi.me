# benshi.me

Version 8 of hbish.com / benshi.me - A complete rewrite using Astro to replicate the existing
hbish.com blog.

## Overview

This is Ben Shi's personal website and blog, featuring posts about software engineering, agile
practices, and self-development. The site includes a comprehensive archive of technical notes and
posts dating back to 2011.

## The Stack

- **Astro** - Static site generator with content collections
- **Tailwind CSS** - Utility-first CSS framework
- **MDX** - Markdown with JSX components
- **Vercel** - Deployment and hosting
- **Reading Time Plugin** - Custom remark plugin for estimated reading times
- **Sitemap & RSS** - Built-in feed generation

## Features

- 📝 Blog posts organized by year
- 📚 Technical notes collection (2011-2020)
- 📄 Static pages (About, Now, Work, Talks, Uses)
- 🎨 Theme switching (planned: light/dark/gruv variants)
- 💬 Cusdis commenting system
- 📡 RSS feed generation
- 🔍 SEO optimized with proper meta tags
- 📱 Fully responsive design
- ⚡ Fast static generation

## Content Collections

### Posts (`/src/content/posts/`)

Main blog posts with frontmatter including title, author, date, tags, and auto-generated reading
time.

### Notes (`/src/content/notes/`)

Technical notes and shorter posts organized by year folders (2011-2020).

### Pages (`/src/content/pages/`)

Static pages like About, Now, Work, Talks, Uses, and Versions.

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linting
pnpm check
```

## Project Structure

```
src/
├── components/          # Reusable Astro components
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Sidebar.astro
│   └── Content.astro
├── content/            # Content collections
│   ├── posts/          # Blog posts by year
│   ├── notes/          # Technical notes by year
│   ├── pages/          # Static pages
│   └── config.ts       # Content collection schemas
├── layouts/            # Page layouts
│   └── Container.astro
├── pages/              # Astro pages and routing
│   ├── index.astro     # Homepage
│   └── [...slug].astro # Dynamic routing
└── styles/             # Global styles
```

## Content Migration Status

This project is migrating content from the existing hbish.com blog built with Gatsby. See
`docs/TODO.md` for current migration progress and remaining tasks.

## Deployment

The site is deployed to Vercel with automatic deployments on push to main branch.

## License

© 2009 - 2024 Ben Shi. All rights reserved.
