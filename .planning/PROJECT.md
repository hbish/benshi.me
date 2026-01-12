# Cloudflare Pages Migration

## What This Is

Migrate the personal website (benshi.me) from Vercel to Cloudflare Pages. The site is an Astro-based
static site generator with blog posts, notes, and webmention integration.

**Current State:** Site successfully deployed on Cloudflare Pages at https://benshi-me.pages.dev/
with all functionality validated. Ready for DNS cutover.

## Core Value

**Site deploys successfully on Cloudflare Pages and is ready for DNS cutover.**

The deployment works correctly with all existing functionality (RSS feeds, webmentions, theming)
preserved.

## Requirements

### Validated

- ✓ Static site generation with Astro 5.1.3 — existing, verified on Cloudflare Pages
- ✓ Standard build process (pnpm build → dist/) — existing, verified with 129 pages generated
- ✓ Markdown-based content with Zod validation — existing
- ✓ Custom domain support (benshi.me) — configured on Cloudflare Pages
- ✓ RSS/JSON feed generation — verified working (11 posts in RSS, JSON Feed v1.1)
- ✓ Webmention.io integration — verified working (links present on posts)
- ✓ Theme system (light/dark/gruv variants) — verified working with localStorage persistence
- ✓ Image optimization via Sharp — existing

### Active

_All migration requirements validated. No active work remaining._

### Out of Scope

- DNS cutover — keeping Vercel active as backup during validation period
- Vercel cleanup — will clean up after Cloudflare deployment is fully validated
- Cloudflare Analytics — add later if needed
- Cloudflare D1, KV, or other services — not needed for static site
- Build optimizations — current build is sufficient

## Context

**Migration completed:**

- Site deployed on Cloudflare Pages at https://benshi-me.pages.dev/
- wrangler.toml configured for declarative deployment
- Custom domain benshi.me configured (awaiting DNS cutover)
- No environment variables required
- SSL certificate active (Google Trust Services WE1)

**Migration drivers:**

- **Consolidation:** Already using Cloudflare for DNS/other services
- **Features:** Access to Cloudflare-specific capabilities if needed later
- **Performance:** Cloudflare's global edge network

**Technical details:**

- Build: `pnpm build` outputs to `dist/`
- Node.js: 22.12.0 (via .tool-versions)
- Package manager: pnpm
- Framework: Astro 5.1.3 with MDX support
- Image optimization: Sharp 0.32.1
- Deployment: wrangler CLI v4.58.0

## Constraints

None — no timing constraints, no downtime requirements, no hard technical limitations.

## Key Decisions

| Decision                                | Rationale                                              | Outcome |
| --------------------------------------- | ------------------------------------------------------ | ------- |
| Keep Vercel active during migration     | Maintain backup while validating Cloudflare deployment | ✓ Good  |
| Standard Astro build (no custom config) | Keep migration simple, leverage Astro defaults         | ✓ Good  |
| No environment variables needed         | Site is fully static, no external service deps         | ✓ Good  |
| wrangler.toml for configuration         | Declarative, version-controlled deployment config      | ✓ Good  |
| Dashboard for custom domain (not CLI)   | wrangler CLI does not support domain management        | ✓ Good  |
| pages_build_output_dir (top-level)      | Cloudflare Pages requires this field format            | ✓ Good  |

---

_Last updated: 2026-01-12 after v1.0 milestone_ _Migration: Vercel → Cloudflare Pages Complete_
