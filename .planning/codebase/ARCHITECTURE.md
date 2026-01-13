# Architecture

**Analysis Date:** 2026-01-13

## Pattern Overview

**Overall:** Static Site Generator (SSG) with Content-Driven Architecture

**Key Characteristics:**

- Static HTML generation at build time
- Content-driven design with markdown/MDX files
- Island architecture: client-side JavaScript only where needed (theme toggle, webmentions)
- Zero server-side runtime requirements
- Multi-collection content structure (posts, notes, pages, photos, collections)

## Layers

**Content Layer:**

- Purpose: Store and structure all content
- Location: `src/content/` (posts, notes, pages, photos, collections)
- Contains: Markdown/MDX files with frontmatter metadata
- Depends on: Zod schemas in `src/content/config.ts`
- Used by: Page layer through Astro's `getCollection()`

**Page Layer:**

- Purpose: Define routes and render pages
- Location: `src/pages/`
- Contains: Route definitions, dynamic routing logic
- Depends on: Content layer, Layout layer
- Used by: Astro's static site generation

**Layout Layer:**

- Purpose: Provide consistent page structure and metadata
- Location: `src/layouts/`
- Contains: `Container.astro` - main layout wrapper
- Depends on: Component layer
- Used by: All pages

**Component Layer:**

- Purpose: Reusable UI elements
- Location: `src/components/`
- Contains: Header, Footer, Sidebar, ThemeToggle, Webmention components, CommentCTA, Content
- Depends on: Styles layer
- Used by: Pages and layouts

**Utility Layer:**

- Purpose: Helper functions and shared logic
- Location: `src/utils/`
- Contains: `extractFirstImage.ts`
- Depends on: None
- Used by: Pages and components

**Plugin Layer:**

- Purpose: Content processing pipeline
- Location: `remark-plugins/`
- Contains: Custom Remark plugins for reading time, image optimization
- Depends on: External npm packages
- Used by: Astro build process

## Data Flow

**Build Process:**

1. Content files (Markdown/MDX) read from `src/content/`
2. Astro content collections validate frontmatter against Zod schemas
3. Remark plugins transform content (reading time, image linking)
4. Pages use `getCollection()` to fetch content
5. `getStaticPaths()` generates all static routes
6. Components render with content data
7. Sharp optimizes images (AVIF, WebP variants)
8. Tailwind CSS processed and inlined
9. Static HTML/CSS/JS written to `dist/`

**Page Request (Production):**

1. User requests page
2. Static HTML file served (no server processing)
3. Client-side JavaScript initializes (theme toggle, webmentions)
4. Webmention components fetch from webmention.io API

**State Management:**

- Theme preference stored in `localStorage` key `hbish-theme`
- No other persistent state

## Key Abstractions

**Content Collection:**

- Purpose: Type-safe content management with schema validation
- Examples: `posts`, `notes`, `pages`, `photos`, `collections` in `src/content/config.ts`
- Pattern: Zod schema defines required/optional frontmatter fields

**Dynamic Route Handler:**

- Purpose: Catch-all routing for posts and notes
- Location: `src/pages/[...slug].astro`
- Pattern: Single route handles multiple content types via discriminating props

**Photo Gallery System:**

- Purpose: Photo albums with CDN integration
- Location: `src/pages/photos.astro`, `src/pages/photos/[slug].astro`
- Pattern: Collections-based with R2 CDN hosting (`https://cdn.hbish.com/`)
- Files: `src/content/collections/` (albums), `src/content/photos/` (individual photos)

**Remark Plugin:**

- Purpose: Transform markdown AST during build
- Examples: `remark-reading-time.mjs`, `remark-auto-link-images.mjs`, `remark-optimize-images.mjs`
- Pattern: Function returning tree transformer that modifies frontmatter

**Layout Component:**

- Purpose: Consistent page structure with SEO metadata
- Location: `src/layouts/Container.astro`
- Pattern: Props interface for metadata, slot for content, scoped styles

## Entry Points

**Dev Server:**

- `pnpm dev` → `astro dev` → Starts development server at http://localhost:4321

**Build:**

- `pnpm build` → `astro build` → Generates static site to `dist/`

**Preview:**

- `pnpm preview` → `astro preview` → Serves built site locally

**Main Pages:**

- `src/pages/index.astro` - Homepage (recent posts)
- `src/pages/[...slug].astro` - Dynamic routes for posts/notes
- `src/pages/photos.astro` - Photo gallery index
- `src/pages/photos/[slug].astro` - Individual photo albums
- `src/pages/archive.astro` - Post archive
- `src/pages/notes.astro` - Notes listing
- `src/pages/tags/[tag].astro` - Tag pages

## Error Handling

**Strategy:** Astro's built-in error handling for build errors

**Patterns:**

- Zod validation catches invalid frontmatter at build time
- Webmention fetch errors silently fail (logged to console)
- No explicit error boundaries

## Cross-Cutting Concerns

**Theme Management:**

- Approach: Client-side JavaScript with localStorage persistence
- Location: `src/components/ThemeToggle.astro`
- Themes: light, dark, gruv-light, gruv-dark

**Photo Management:**

- Storage: Cloudflare R2 (S3-compatible)
- CDN: `https://cdn.hbish.com/`
- Upload script: `scripts/upload-photos.js` using `@aws-sdk/client-s3`
- Content: Photo metadata in `src/content/photos/`, albums in `src/content/collections/`

**SEO:**

- Approach: JSON-LD schema markup in each page
- Location: `src/pages/[...slug].astro`
- Meta tags: Open Graph, Twitter cards, JSON-LD

**Content Processing:**

- Approach: Unified Remark plugin pipeline
- Location: `astro.config.mjs`
- Transformations: Reading time, image auto-linking, image optimization

---

_Architecture analysis: 2026-01-13_ _Update when major patterns change_
