# Roadmap: Cloudflare Pages Migration

## Overview

Migrate the personal website (benshi.me) from Vercel to Cloudflare Pages. The migration involves
setting up the Cloudflare Pages project with the correct build configuration, adding the custom
domain, and validating that all existing functionality works correctly. This enables consolidation
with existing Cloudflare services and leverages their global edge network.

## Domain Expertise

None

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Cloudflare Pages Setup** - Create project, configure build settings, connect Git
      repo
- [ ] **Phase 2: Domain Configuration** - Add benshi.me custom domain, configure DNS settings
- [ ] **Phase 3: Validation** - Verify deployment works, test all site functionality

## Phase Details

### Phase 1: Cloudflare Pages Setup

**Goal**: Create Cloudflare Pages project with correct Astro build configuration

**Depends on**: Nothing (first phase)

**Research**: Unlikely (standard Astro deployment, Cloudflare Pages has good docs)

**Plans**: 2 plans

Plans:

- [x] 01-01: Create Cloudflare Pages project and connect Git repository
- [x] 01-02: Configure build settings (pnpm build, Node.js 22, dist/ output)

### Phase 2: Domain Configuration

**Goal**: Add benshi.me custom domain and configure DNS

**Depends on**: Phase 1

**Research**: Likely (need to understand Cloudflare DNS setup for custom domains)

**Research topics**: Cloudflare Pages custom domain setup, DNS configuration options, SSL
provisioning

**Plans**: 2 plans

Plans:

- [x] 02-01: Add benshi.me custom domain to Cloudflare Pages project
- [x] 02-02: Configure DNS settings and verify SSL certificate

### Phase 3: Validation

**Goal**: Verify deployment works and all functionality is preserved

**Depends on**: Phase 2

**Research**: Unlikely (testing existing functionality)

**Plans**: 3 plans

Plans:

- [ ] 03-01: Verify site builds and deploys successfully
- [ ] 03-02: Test RSS feeds, JSON feeds, and webmention integration
- [ ] 03-03: Verify theming system and all pages work correctly

## Progress

**Execution Order:** Phases execute in numeric order: 1 → 2 → 3

| Phase                     | Plans Complete | Status      | Completed  |
| ------------------------- | -------------- | ----------- | ---------- |
| 1. Cloudflare Pages Setup | 2/2            | Complete    | 2026-01-12 |
| 2. Domain Configuration   | 2/2            | Complete    | 2026-01-12 |
| 3. Validation             | 0/3            | Not started | -          |
