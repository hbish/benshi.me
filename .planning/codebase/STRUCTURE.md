# Codebase Structure

**Analysis Date:** 2026-01-13

## Directory Layout

```
benshi.me/
├── .husky/                 # Git hooks (pre-commit)
├── .planning/              # Planning and project documentation
├── dist/                   # Build output (generated)
├── node_modules/           # Dependencies (not in repo)
├── public/                 # Static assets served at root
├── remark-plugins/         # Custom markdown processing plugins
├── scripts/                # Build and validation scripts
│   ├── sample-photos/      # Sample photos for testing
│   ├── upload-photos.js    # R2 photo upload script
│   ├── validate-feeds.js   # Feed validation wrapper
│   ├── validate-json-feed.js # JSON Feed validation
│   └── validate-rss.js     # RSS feed validation
├── src/                    # Source code
│   ├── assets/            # Static assets (images, SVGs)
│   │   ├── svg/           # Inline SVG assets
│   │   └── profile-pic.png
│   ├── components/        # Reusable Astro components
│   │   ├── CommentCTA.astro
│   │   ├── Content.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Sidebar.astro
│   │   ├── ThemeToggle.astro
│   │   ├── WebmentionCount.astro
│   │   └── WebmentionFeed.astro
│   ├── content/           # Markdown/MDX content files
│   │   ├── config.ts      # Content collection schemas
│   │   ├── collections/   # Photo album definitions
│   │   ├── notes/         # Quick notes (year folders)
│   │   ├── pages/         # Static pages
│   │   ├── photos/        # Individual photo metadata
│   │   └── posts/         # Blog posts (year folders)
│   ├── layouts/           # Page layout templates
│   │   ├── Container.astro # Main layout wrapper
│   │   └── Page.astro      # Base page layout
│   ├── pages/             # Route definitions
│   │   ├── tags/          # Tag subdirectory
│   │   ├── photos/        # Photo pages subdirectory
│   │   ├── index.astro
│   │   ├── [...slug].astro
│   │   ├── 404.astro
│   │   ├── about.astro
│   │   ├── archive.astro
│   │   ├── feed.json.js
│   │   ├── notes.astro
│   │   ├── now.astro
│   │   ├── photos.astro
│   │   ├── rss.xml.js
│   │   ├── uses.astro
│   │   ├── versions.astro
│   │   └── work.astro
│   ├── styles/            # Global CSS
│   │   └── global.css
│   ├── utils/             # Utility functions
│   │   └── extractFirstImage.ts
│   ├── consts.ts          # Site constants
│   └── env.d.ts           # TypeScript environment definitions
├── astro.config.mjs       # Astro configuration
├── eslint.config.mjs      # ESLint flat config
├── package.json           # Project manifest and scripts
├── pnpm-lock.yaml         # Dependency lockfile
├── tailwind.config.cjs    # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── wrangler.toml          # Cloudflare Pages config
└── .prettierrc.json       # Prettier configuration
```

## Directory Purposes

**src/components/:**

- Purpose: Reusable UI components
- Contains: Astro components for Header, Footer, Sidebar, ThemeToggle, Webmention components
- Key files: `Sidebar.astro`, `Header.astro`, `Footer.astro`, `ThemeToggle.astro`,
  `WebmentionFeed.astro`
- Subdirectories: None

**src/content/:**

- Purpose: Content storage with type-safe schemas
- Contains: Markdown/MDX files organized by type
- Key files: `config.ts` (Zod schemas for content validation)
- Subdirectories: `posts/`, `notes/`, `pages/`, `photos/`, `collections/`

**src/content/photos/:**

- Purpose: Individual photo metadata with R2 CDN references
- Contains: Photo frontmatter with `id` field pointing to R2 objects
- Key files: Individual photo `.md` files

**src/content/collections/:**

- Purpose: Photo album definitions
- Contains: Collection frontmatter with `coverPhoto`, `tags`, `title`
- Key files: Album `.md` files

**src/layouts/:**

- Purpose: Page layout templates with consistent structure
- Contains: `Container.astro` (main layout wrapper), `Page.astro` (base page layout)
- Key files: `Container.astro`, `Page.astro`
- Subdirectories: None

**src/pages/:**

- Purpose: Route definitions for Astro's file-based routing
- Contains: Page components and API endpoints
- Key files: `index.astro`, `[...slug].astro`, `archive.astro`, `notes.astro`, `photos.astro`
- Subdirectories: `tags/`, `photos/`

**src/styles/:**

- Purpose: Global CSS styles with theme variables
- Contains: `global.css`
- Key files: `global.css` (theme CSS variables for light, dark, gruvbox themes)
- Subdirectories: None

**src/utils/:**

- Purpose: Helper functions
- Contains: `extractFirstImage.ts`
- Key files: `extractFirstImage.ts`
- Subdirectories: None

**remark-plugins/:**

- Purpose: Custom markdown processing plugins
- Contains: `remark-reading-time.mjs`, `remark-auto-link-images.mjs`, `remark-optimize-images.mjs`
- Key files: All three remark plugins
- Subdirectories: None

**scripts/:**

- Purpose: Build validation and utility scripts
- Contains: RSS/JSON feed validation scripts, photo upload script
- Key files: `validate-rss.js`, `validate-json-feed.js`, `upload-photos.js`
- Subdirectories: `sample-photos/`

## Key File Locations

**Entry Points:**

- `src/pages/index.astro` - Homepage
- `src/pages/[...slug].astro` - Dynamic content routes (posts/notes)
- `src/pages/photos.astro` - Photo gallery index
- `src/pages/photos/[slug].astro` - Individual photo albums

**Configuration:**

- `astro.config.mjs` - Astro configuration (site, integrations, image service)
- `tailwind.config.cjs` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.mjs` - ESLint flat config rules
- `.prettierrc.json` - Code formatting rules
- `wrangler.toml` - Cloudflare Pages deployment config

**Core Logic:**

- `src/content/config.ts` - Content collection schemas with Zod
- `src/layouts/Container.astro` - Main layout component
- `src/utils/extractFirstImage.ts` - Image extraction utility
- `src/consts.ts` - Site constants (SITE_TITLE, SITE_DESCRIPTION)

**Testing:**

- Not detected - No test files exist

**Documentation:**

- `CLAUDE.md` - Instructions for Claude Code
- `README.md` - Project documentation

## Naming Conventions

**Files:**

- PascalCase.astro for components - `Header.astro`, `Footer.astro`, `Sidebar.astro`
- kebab-case.mjs for remark plugins - `remark-reading-time.mjs`
- camelCase.ts for utilities - `extractFirstImage.ts`
- kebab-case.js for scripts - `validate-rss.js`
- [slug].astro for dynamic routes - `[...slug].astro`, `[tag].astro`
- kebab-case.md for content - `MM-DD-title.md`

**Directories:**

- kebab-case for all directories - `components`, `layouts`, `remark-plugins`
- Plural for collections - `posts`, `notes`, `pages`, `photos`, `collections`

**Special Patterns:**

- [...slug].astro for catch-all dynamic routes
- [tag].astro for single-parameter dynamic routes
- config.ts for configuration files
- .astro for Astro component files

## Where to Add New Code

**New Component:**

- Implementation: `src/components/ComponentName.astro`
- Tests: Not applicable (no test framework)

**New Page:**

- Implementation: `src/pages/page-name.astro` (for static) or `src/pages/[slug].astro` (for dynamic)

**New Content:**

- Posts: `src/content/posts/YYYY/MM-DD-title.md`
- Notes: `src/content/notes/YYYY/MM-DD-title.md`
- Pages: `src/content/pages/page-name.md`
- Photos: `src/content/photos/photo-name.md`
- Collections: `src/content/collections/album-name.md`

**New Remark Plugin:**

- Implementation: `remark-plugins/remark-plugin-name.mjs`
- Registration: Add to `astro.config.mjs` under `markdown.remarkPlugins`

**New Utility:**

- Implementation: `src/utils/utility-name.ts`

## Special Directories

**dist/:**

- Purpose: Build output directory
- Source: Generated by `astro build`
- Committed: No (in .gitignore)

**node_modules/:**

- Purpose: Installed dependencies
- Source: pnpm install
- Committed: No (in .gitignore)

**public/:**

- Purpose: Static assets served at site root
- Source: Manual file placement
- Committed: Yes

**scripts/sample-photos/:**

- Purpose: Sample photos for testing upload script
- Source: Manual placement
- Committed: Yes

---

_Structure analysis: 2026-01-13_ _Update when directory structure changes_
