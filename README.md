# benshi.me

Ben Shi's personal website and blog - A static site built with Astro featuring posts about software
engineering, agile practices, and self-development.

## Overview

This is a personal website featuring:

- Blog posts about software engineering and technology
- Technical notes and shorter posts (dating back to 2011)
- Photo gallery with CDN-hosted images
- Static pages (About, Now, Work, Uses, Versions)
- RSS and JSON feed generation
- Webmention support for social interactions

## Tech Stack

**Core:**

- **Astro 5.1.3** - Static site generator with content collections
- **TypeScript 5.9.2** - Type-safe development
- **Node.js 22** - Runtime environment

**Styling:**

- **Tailwind CSS 3.0.24** - Utility-first CSS framework
- **Custom theme system** - Light, dark, gruv-light, gruv-dark variants

**Content:**

- **MDX** - Markdown with JSX support via `@astrojs/mdx`
- **Zod** - Content schema validation
- **Remark plugins** - Custom plugins for reading time and image optimization

**Infrastructure:**

- **Cloudflare Pages** - Deployment and hosting (via `wrangler`)
- **Cloudflare R2** - Photo storage with CDN (`https://cdn.hbish.com/`)
- **Webmention.io** - Social interactions and comments

**Development:**

- **pnpm** - Package management
- **ESLint 9.36.0** - Linting with flat config
- **Prettier 3.6.2** - Code formatting
- **Husky + lint-staged** - Pre-commit hooks

## Features

- 📝 Blog posts organized by year
- 📚 Technical notes collection (2011-present)
- 📸 Photo gallery with album organization
- 📄 Static pages (About, Now, Work, Uses, Versions)
- 🎨 Theme switching (light/dark/gruv-light/gruv-dark)
- 💬 Webmention support for interactions
- 📡 RSS and JSON feed generation
- 🔍 SEO optimized with JSON-LD structured data
- 📱 Fully responsive design
- ⚡ Fast static generation with image optimization

## Content Collections

### Posts (`/src/content/posts/`)

Blog posts with frontmatter including title, author, date, tags, and auto-generated reading time.

### Notes (`/src/content/notes/`)

Shorter technical notes and quick thoughts organized by year folders.

### Pages (`/src/content/pages/`)

Static pages: About, Now, Work, Uses, Versions.

### Photos (`/src/content/photos/`)

Individual photo metadata with R2 CDN references.

### Collections (`/src/content/collections/`)

Photo album definitions with cover photos, tags, and descriptions.

## Development

```bash
# Install dependencies
pnpm install

# Start development server (http://localhost:4321)
pnpm dev

# Type checking
pnpm check

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linting (with auto-fix)
pnpm lint

# Check linting without auto-fix
pnpm lint:check

# Format code
pnpm format

# Validate RSS/JSON feeds
pnpm validate:feeds
```

## Scripts

- `scripts/upload-photos.js` - Upload photos to Cloudflare R2
- `scripts/validate-rss.js` - Validate RSS feed structure
- `scripts/validate-json-feed.js` - Validate JSON Feed structure
- `scripts/validate-feeds.js` - Run all feed validators

## Project Structure

```
src/
├── components/          # Reusable Astro components
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Sidebar.astro
│   ├── ThemeToggle.astro
│   ├── Content.astro
│   ├── WebmentionFeed.astro
│   ├── WebmentionCount.astro
│   └── CommentCTA.astro
├── content/            # Content collections
│   ├── posts/          # Blog posts by year
│   ├── notes/          # Technical notes by year
│   ├── pages/          # Static pages
│   ├── photos/         # Photo metadata
│   ├── collections/    # Photo albums
│   └── config.ts       # Zod schemas for validation
├── layouts/            # Page layouts
│   ├── Container.astro # Main layout wrapper
│   └── Page.astro      # Base page layout
├── pages/              # Astro pages and routing
│   ├── index.astro     # Homepage
│   ├── [...slug].astro # Dynamic routing (posts/notes)
│   ├── photos.astro    # Photo gallery
│   ├── photos/[slug].astro # Individual albums
│   ├── tags/[tag].astro # Tag pages
│   ├── archive.astro   # Post archive
│   ├── notes.astro     # Notes listing
│   └── rss.xml.js      # RSS feed
├── styles/             # Global styles
│   └── global.css      # Theme variables
├── utils/              # Utility functions
│   └── extractFirstImage.ts
├── consts.ts           # Site constants
└── env.d.ts            # TypeScript definitions
```

## Configuration Files

- `astro.config.mjs` - Astro configuration (site, integrations, image service)
- `tailwind.config.cjs` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint flat config
- `.prettierrc.json` - Prettier configuration
- `wrangler.toml` - Cloudflare Pages deployment config

## Deployment

The site is deployed to Cloudflare Pages with automatic deployments.

**Environment Variables:**

- `CLOUDFLARE_ACCOUNT_ID` - R2 account ID
- `R2_ACCESS_KEY_ID` - R2 access key
- `R2_SECRET_ACCESS_KEY` - R2 secret key

## License

© 2009 - 2025 Ben Shi. All rights reserved.
