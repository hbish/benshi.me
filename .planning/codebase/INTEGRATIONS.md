# External Integrations

**Analysis Date:** 2026-01-13

## APIs & External Services

**Cloudflare R2 (AWS S3-compatible):**

- Purpose: Photo storage and CDN hosting
- SDK/Client: `@aws-sdk/client-s3` - `scripts/upload-photos.js`
- Auth: Environment variables - `CLOUDFLARE_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`
- Bucket: `benshi-photos`
- CDN URLs: `https://cdn.hbish.com/`, `https://photos.benshi.me/`
- Upload script: `scripts/upload-photos.js`

**Webmention.io:**

- Purpose: Social interactions and comments
- SDK/Client: Custom fetch in `src/components/WebmentionFeed.astro`,
  `src/components/WebmentionCount.astro`
- Auth: None required (public API)
- Endpoints used: `https://webmention.io/api/mentions.jf2`
- Files: `src/components/WebmentionFeed.astro`, `src/components/WebmentionCount.astro`,
  `src/components/CommentCTA.astro`

## Data Storage

**Databases:**

- Not detected - All content is file-based

**File Storage:**

- Cloudflare R2 - Photo storage with CDN
  - Connection: AWS S3 SDK with R2 credentials
  - Bucket: `benshi-photos`
  - CDN: `https://cdn.hbish.com/`
- Local filesystem - All other assets in `src/assets/` and `public/`
  - Images optimized via Sharp during build
  - Static assets served from root

**Caching:**

- Not detected - No server-side caching
- Client-side: localStorage for theme preference only

## Authentication & Identity

**Auth Provider:**

- Not detected - No authentication required

**OAuth Integrations:**

- None

## Monitoring & Observability

**Error Tracking:**

- None

**Analytics:**

- None detected (no Google Analytics, Plausible, etc.)

**Logs:**

- Console output during build only
- No production logging

## CI/CD & Deployment

**Hosting:**

- Cloudflare Pages - Configured in `wrangler.toml`
- Build Command: `pnpm build`
- Build Output: `dist/` directory
- Environment vars: Configured for R2 credentials

**CI Pipeline:**

- Not detected - No GitHub Actions or other CI configured
- Pre-commit hooks only via Husky

## Environment Configuration

**Development:**

- Required env vars: None (R2 credentials only needed for photo uploads)
- Secrets location: `.env` (gitignored), `.env.example` for reference
- Mock/stub services: None needed

**Staging:**

- Not applicable - No separate environments

**Production:**

- Secrets management: Cloudflare Pages environment variables
- Environment-specific: R2 credentials for photo CDN

## Webhooks & Callbacks

**Incoming:**

- None

**Outgoing:**

- None - Webmentions are client-side fetch only

## Feed Generation

**RSS Feed:**

- Endpoint: `src/pages/rss.xml.js`
- Validation: `scripts/validate-rss.js`
- Dependencies: `@astrojs/rss`, `rss-parser`, `fast-xml-parser`

**JSON Feed:**

- Endpoint: `src/pages/feed.json.js`
- Validation: `scripts/validate-json-feed.js`

**Feed Validation:**

- Wrapper script: `scripts/validate-feeds.js` (runs both validators)
- Run via: `pnpm validate:feeds` or `pnpm build` (automatic)

## Content Sources

**Local File-Based Content Management:**

- `src/content/posts/` - Blog posts (organized by year: 2011/, 2012/, etc.)
- `src/content/notes/` - Short notes (organized by year)
- `src/content/pages/` - Static pages (about, uses, now, versions, work)
- `src/content/photos/` - Individual photo metadata with R2 references
- `src/content/collections/` - Photo album definitions
- Schema: Zod-validated frontmatter defined in `src/content/config.ts`

---

_Integration audit: 2026-01-13_ _Update when adding/removing external services_
