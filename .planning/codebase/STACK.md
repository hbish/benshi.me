# Technology Stack

**Analysis Date:** 2026-01-11

## Languages

**Primary:**

- TypeScript 5.9.2 - All application code in `src/`
- JavaScript/ESM - Build scripts and configuration files

**Secondary:**

- Markdown/MDX - Content files in `src/content/`

## Runtime

**Environment:**

- Node.js 22.12.0 - Specified in `.tool-versions`

**Package Manager:**

- pnpm - Lockfile: `pnpm-lock.yaml` present

## Frameworks

**Core:**

- Astro 5.1.3 - Static site generator with content collections
- Astro MDX 4.0.3 - MDX support for content

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
- @astrojs/sitemap 3.2.1 - Sitemap generation
- @astrojs/tailwind 5.1.4 - Tailwind integration
- reading-time 1.5.0 - Reading time calculation
- mdast-util-to-string 3.2.0 - Markdown AST utilities
- unist-util-visit 5.0.0 - AST traversal

**Validation:**

- Zod (bundled with Astro) - Content schema validation

**Code Quality:**

- ESLint with custom config - `eslint.config.mjs`
- Prettier with Astro plugin - `.prettierrc.json`
- Husky - Git hooks
- lint-staged - Pre-commit linting

## Configuration

**Environment:**

- No environment variables required
- All configuration via config files

**Build:**

- `astro.config.mjs` - Astro configuration (site, integrations, image optimization)
- `tailwind.config.cjs` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration extending Astro's strict config

**Content:**

- `src/content/config.ts` - Content collection schemas with Zod validation

## Platform Requirements

**Development:**

- Any platform with Node.js 22.12.0+
- pnpm for package management

**Production:**

- Static HTML/CSS/JS output to `dist/`
- Can be deployed to any static hosting service
- No server-side runtime requirements

---

_Stack analysis: 2026-01-11_ _Update after major dependency changes_
