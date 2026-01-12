# Roadmap: Cloudflare Pages Migration

## Overview

Migrate the personal website (benshi.me) from Vercel to Cloudflare Pages, then add a photo gallery
feature powered by Cloudflare Images.

## Milestones

- ✅ **v1.0 Cloudflare Pages Migration** — Phases 1-3 (shipped 2026-01-12)
  - Full details: [.planning/milestones/v1.0-ROADMAP.md](.planning/milestones/v1.0-ROADMAP.md)
- 🚧 **v1.1 Photo Gallery** — Phases 4-7 (in progress)

## Completed Milestones

<details>
<summary>✅ v1.0 Cloudflare Pages Migration (Phases 1-3) — SHIPPED 2026-01-12</summary>

- [x] Phase 1: Cloudflare Pages Setup (2/2 plans) — completed 2026-01-12
- [x] Phase 2: Domain Configuration (2/2 plans) — completed 2026-01-12
- [x] Phase 3: Validation (3/3 plans) — completed 2026-01-12

</details>

## 🚧 v1.1 Photo Gallery (In Progress)

**Milestone Goal:** Add a photo gallery with R2 object storage, custom domain CDN, masonry grid,
collections, and filtering.

#### Phase 4: Cloudflare R2 Storage Setup

**Goal**: Configure Cloudflare R2 for image storage with custom domain CDN and upload sample photos
**Depends on**: v1.0 milestone complete **Research**: Completed (R2 S3-compatible API)

Plans:

- [x] 04-01: R2 bucket, upload script, photos page (completed 2026-01-12)

#### Phase 5: Gallery Data Structure

**Goal**: Create photo collections and metadata schema **Depends on**: Phase 4 **Research**:
Unlikely (internal data structures using existing Astro patterns) **Plans**: TBD

Plans:

- [ ] 05-01: TBD

#### Phase 6: Gallery UI Components

**Goal**: Build masonry grid, collections view, and filtering UI **Depends on**: Phase 5
**Research**: Unlikely (internal UI using existing Tailwind patterns) **Plans**: TBD

Plans:

- [ ] 06-01: TBD

#### Phase 7: Gallery Integration

**Goal**: Add lazy loading, responsive images, and lightbox **Depends on**: Phase 6 **Research**:
Likely (need to evaluate lazy loading options for Astro/Images) **Research topics**: Astro Image
component lazy loading, responsive image strategies, lightbox libraries **Plans**: TBD

Plans:

- [ ] 07-01: TBD

## Progress

| Phase                     | Milestone | Plans Complete | Status      | Completed  |
| ------------------------- | --------- | -------------- | ----------- | ---------- |
| 1. Cloudflare Pages Setup | v1.0      | 2/2            | Complete    | 2026-01-12 |
| 2. Domain Configuration   | v1.0      | 2/2            | Complete    | 2026-01-12 |
| 3. Validation             | v1.0      | 3/3            | Complete    | 2026-01-12 |
| 4. Cloudflare R2 Storage  | v1.1      | 1/1            | Complete    | 2026-01-12 |
| 5. Gallery Data Structure | v1.1      | 0/?            | Not started | -          |
| 6. Gallery UI Components  | v1.1      | 0/?            | Not started | -          |
| 7. Gallery Integration    | v1.1      | 0/?            | Not started | -          |

**Overall Progress: ██████░░░░ 50%**
