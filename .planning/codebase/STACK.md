# Technology Stack

**Analysis Date:** 2026-01-13

## Languages

**Primary:**

- TypeScript 5.9.2 - All application code in `src/`
- JavaScript/ESM - Build scripts and configuration files (`.mjs`, `.js`)

**Secondary:**

- Markdown/MDX - Content files in `src/content/posts/`, `src/content/notes/`
- HTML/CSS - Tailwind CSS utility classes and inline styles

## Runtime

**Environment:**

- Node.js 22 - Specified in `wrangler.toml`
- ES Modules - `package.json` `"type": "module"`

**Package Manager:**

- pnpm - Lockfile: `pnpm-lock.yaml` present

## Frameworks

**Core:**

- Astro 5.1.3 - Static site generator with content collections
- Astro MDX 4.0.3 (`@astrojs/mdx`) - MDX support for content
- Astro Sitemap (`@astrojs/sitemap`) - Sitemap generation
- Astro Tailwind (`@astrojs/tailwind`) 5.1.4 - Tailwind CSS integration

**Testing:**

- Not detected - No test framework in use

**Build/Dev:**

- Vite - Bundled with Astro for dev server and builds
- TypeScript 5.9.2 - Type checking and compilation
- Sharp 0.32.1 - Image optimization

**CSS:**

- Tailwind CSS 3.0.24 - Utility-first CSS framework
- @tailwindcss/typography 0.5.9 - Typography plugin
- @tailwindcss/aspect-ratio 0.4.2 - Aspect ratio plugin

## Key Dependencies

**Content Processing:**

- @astrojs/rss 4.0.11 - RSS feed generation
- @astrojs/check - TypeScript checking
- reading-time 1.5.0 - Reading time calculation
- mdast-util-to-string 3.2.0 - Markdown AST utilities
- unist-util-visit 5.0.0 - AST traversal

**Infrastructure:**

- @aws-sdk/client-s3 - AWS S3/Cloudflare R2 SDK for photo uploads (`scripts/upload-photos.js`)
- wrangler 4.58.0 - Cloudflare Pages CLI deployment
- dotenv 17.2.3 - Environment variable loading

**Validation:**

- Zod (bundled with Astro) - Content schema validation
- fast-xml-parser - XML parsing for feed validation (`scripts/validate-rss.js`)
- rss-parser 3.13.0 - RSS parsing (`scripts/validate-rss.js`)

**Code Quality:**

- ESLint 9.36.0 with flat config - `eslint.config.mjs`
- Prettier 3.6.2 with Astro plugin - `.prettierrc.json`
- Husky 9.1.7 - Git hooks
- lint-staged 16.1.6 - Pre-commit linting
- typescript-eslint 8.44.0 - TypeScript linting rules

## Configuration

**Environment:**

- `.env.example` present for reference
- Cloudflare R2 credentials: `CLOUDFLARE_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`
- Webmention.io API endpoint (public, no auth required)

**Build:**

- `astro.config.mjs` - Astro configuration (site, integrations, image optimization)
- `tailwind.config.cjs` - Tailwind CSS configuration with plugins
- `tsconfig.json` - TypeScript configuration extending `astro/tsconfigs/strict`
- `wrangler.toml` - Cloudflare Pages deployment config
- `.prettierrc.json` - Code formatting configuration
- `eslint.config.mjs` - ESLint flat config

## Platform Requirements

**Development:**

- Any platform with Node.js 22+
- pnpm for package management
- No database required (file-based content)

**Production:**

- Static HTML/CSS/JS output to `dist/`
- Can be deployed to any static hosting service
- No server-side runtime requirements

---

_Stack analysis: 2026-01-13_ _Update after major dependency changes_
