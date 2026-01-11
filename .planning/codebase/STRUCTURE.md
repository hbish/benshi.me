# Codebase Structure

**Analysis Date:** 2026-01-11

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
├── src/                    # Source code
│   ├── assets/            # Static assets (images, SVGs)
│   ├── components/        # Reusable Astro components
│   ├── content/           # Markdown/MDX content files
│   │   ├── config.ts      # Content collection schemas
│   │   ├── posts/         # Blog posts (year folders)
│   │   ├── notes/         # Quick notes (year folders)
│   │   └── pages/         # Static pages
│   ├── layouts/           # Page layout templates
│   ├── pages/             # Route definitions
│   ├── styles/            # Global CSS
│   ├── utils/             # Utility functions
│   └── consts.ts          # Site constants
├── astro.config.mjs       # Astro configuration
├── eslint.config.mjs      # ESLint configuration
├── package.json           # Project manifest and scripts
├── pnpm-lock.yaml         # Dependency lockfile
├── tailwind.config.cjs    # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
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
- Subdirectories: `posts/`, `notes/`, `pages/`

**src/layouts/:**

- Purpose: Page layout templates with consistent structure
- Contains: `Container.astro` (main layout wrapper)
- Key files: `Container.astro`
- Subdirectories: None

**src/pages/:**

- Purpose: Route definitions for Astro's file-based routing
- Contains: Page components and API endpoints
- Key files: `index.astro`, `[...slug].astro`, `archive.astro`, `notes.astro`, `tags/[tag].astro`
- Subdirectories: `tags/` (dynamic tag pages)

**src/styles/:**

- Purpose: Global CSS styles
- Contains: `global.css`
- Key files: `global.css`
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
- Contains: RSS/JSON feed validation scripts
- Key files: `validate-rss.js`, `validate-json-feed.js`
- Subdirectories: None

## Key File Locations

**Entry Points:**

- `src/pages/index.astro` - Homepage
- `src/pages/[...slug].astro` - Dynamic content routes (posts/notes)

**Configuration:**

- `astro.config.mjs` - Astro configuration (site, integrations, image service)
- `tailwind.config.cjs` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.mjs` - ESLint rules
- `.prettierrc.json` - Code formatting rules

**Core Logic:**

- `src/content/config.ts` - Content collection schemas with Zod
- `src/layouts/Container.astro` - Main layout component
- `src/utils/extractFirstImage.ts` - Image extraction utility
- `src/consts.ts` - Site constants

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
- Plural for collections - `posts`, `notes`, `pages`

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

---

_Structure analysis: 2026-01-11_ _Update when directory structure changes_
