# Codebase Concerns

**Analysis Date:** 2026-01-13

## Tech Debt

**Duplicate Year-Grouping Logic:**

- Issue: `src/pages/index.astro`, `src/pages/archive.astro`, and `src/pages/notes.astro` all
  implement identical logic for grouping content by year using Map()
- Files: `src/pages/index.astro`, `src/pages/archive.astro`, `src/pages/notes.astro`
- Why: Each page was likely created independently without extracting shared logic
- Impact: Code duplication, maintenance burden (changes must be made in 3 places)
- Fix approach: Extract to shared utility function in `src/utils/groupByYear.ts`

**Large Components:**

- Issue: Several components exceed 200 lines with mixed concerns
- Files: `src/components/Sidebar.astro` (281 lines), `src/components/WebmentionFeed.astro` (250+
  lines)
- Why: Organic growth without refactoring
- Impact: Difficult to understand and maintain
- Fix approach: Split into smaller focused components

**No Test Suite:**

- Issue: Entire codebase lacks automated tests
- Impact: No regression protection, risky refactoring
- Fix approach: Add Vitest for unit tests, start with utility functions

**Duplicate Icon Markup:**

- Issue: Social icons (X, GitHub, LinkedIn, Keybase, Email) are duplicated in Sidebar.astro for
  mobile and desktop views
- Files: `src/components/Sidebar.astro`
- Why: Separate mobile menu and desktop layouts
- Impact: Maintenance burden (icon changes require updates in multiple places)
- Fix approach: Extract social links to separate component

## Known Bugs

**Random Sorting Algorithm:**

- Issue: `src/pages/404.astro` uses `Math.random() - 0.5` which is not a proper shuffle
- File: `src/pages/404.astro`
- Cause: Common misconception about random shuffling
- Impact: Not uniformly random, biased results
- Fix approach: Use Fisher-Yates shuffle algorithm

**None detected** - No other obvious bugs found during analysis

## Security Considerations

**Hardcoded Contact Information:**

- Risk: Email address and social links scattered throughout components
- Files: `src/components/Sidebar.astro` (ben@hbish.com), social media URLs
- Current mitigation: None - values are public anyway
- Recommendations: Consider centralizing in `src/consts.ts` or config for easier updates

**External Image Loading:**

- Risk: WebmentionFeed loads external avatar images from webmention.io without validation
- Files: `src/components/WebmentionFeed.astro`
- Current mitigation: Images rendered as <img> tags (browser handles)
- Recommendations: Consider adding CSP headers if deploying to platforms that support it

**Environment Variables in Upload Script:**

- Risk: `scripts/upload-photos.js` loads dotenv but no .env.example documents required vars
- Files: `scripts/upload-photos.js`
- Current mitigation: Script is developer-facing, not part of build
- Recommendations: Document R2 credentials in .env.example

## Performance Bottlenecks

**Uncached Webmention Fetches:**

- Problem: WebmentionFeed and WebmentionCount make separate API calls without client-side caching
- Files: `src/components/WebmentionFeed.astro`, `src/components/WebmentionCount.astro`
- Cause: Each component independently fetches from webmention.io
- Impact: Multiple API calls for same page
- Improvement path: Implement shared caching layer or combine fetches

**Photos Page Client-Side Filtering:**

- Problem: `src/pages/photos.astro` implements tag filtering entirely in JavaScript
- File: `src/pages/photos.astro`
- Measurement: All albums rendered, then hidden/shown via JS
- Cause: Static build limitation (tag filtering requires dynamic routes)
- Improvement path: Consider static tag pages or use Astro's view transitions

**Large Global CSS:**

- Problem: `src/styles/global.css` is 798 lines with extensive theme definitions
- File: `src/styles/global.css`
- Cause: All theme variants defined in one file
- Impact: Entire CSS loaded on every page
- Improvement path: Consider CSS code splitting or critical CSS extraction

## Fragile Areas

**Webmention Fetching:**

- Why fragile: External API dependency with minimal error handling
- Files: `src/components/WebmentionFeed.astro`, `src/components/WebmentionCount.astro`
- Common failures: Network errors, API rate limits, invalid responses
- Safe modification: Add proper error boundaries and fallbacks
- Test coverage: No tests for webmention logic

**Theme Toggle Initialization:**

- Why fragile: Multiple initialization points (page load, astro:page-load)
- File: `src/components/ThemeToggle.astro`
- Common failures: Theme flash on page load, state desync
- Safe modification: Consolidate initialization logic
- Test coverage: No tests

**Photo Upload Script:**

- Why fragile: Direct R2 API calls with minimal error handling
- File: `scripts/upload-photos.js`
- Common failures: Network errors, invalid credentials, missing files
- Safe modification: Add comprehensive error handling and validation
- Test coverage: No tests

## Scaling Limits

**Static Site Limitations:**

- Current capacity: Scales with build time
- Limit: Build time increases linearly with content count
- Symptoms at limit: Long build times, large dist/ folder
- Scaling path: Consider incremental static regeneration or pagination for archives

**Webmention API:**

- Current capacity: Dependent on webmention.io rate limits
- Limit: Unknown (public API)
- Symptoms at limit: Failed webmention loads
- Scaling path: Implement client-side caching with expiration

**Photo Storage (R2):**

- Current capacity: Dependent on R2 bucket limits
- Limit: Tied to Cloudflare R2 pricing tier
- Scaling path: Document current limits, monitor usage

## Dependencies at Risk

**Tailwind CSS Version:**

- Risk: Using v3.0.24 (current is v3.4+)
- Impact: Missing performance improvements and features
- Migration plan: Upgrade to latest Tailwind CSS v3

**No Dependency Scanning:**

- Risk: No automated checking for known vulnerabilities
- Impact: Vulnerable dependencies could go undetected
- Migration plan: Add `pnpm audit` to CI or pre-commit hooks

**Outdated ESLint Config:**

- Risk: Using new flat config format (good) but may need updates
- Impact: Potential linting issues with new TypeScript/Eslint versions
- Migration plan: Keep typescript-eslint updated

## Missing Critical Features

**No Content Search:**

- Problem: Users cannot search posts/notes
- Current workaround: Manual browsing through archives/tags
- Blocks: Content discovery
- Implementation complexity: Medium (would require search index or external service)

**No RSS Validation in CI:**

- Problem: Feed validation scripts must be run manually
- Current workaround: Developer must remember to run `pnpm validate:feeds`
- Blocks: Nothing (feeds fail visibly if broken)
- Implementation complexity: Low (add to pre-commit or CI)

## Test Coverage Gaps

**Entire Codebase:**

- What's not tested: All functionality lacks automated tests
- Risk: Regressions when making changes
- Priority: High
- Difficulty to test: Medium (Astro component testing requires setup)

**Critical Functions:**

- What's not tested: `src/utils/extractFirstImage.ts`, remark plugins, theme toggle logic
- Risk: Bugs in core functionality
- Priority: High
- Difficulty to test: Low (pure functions, easy to test)

**Webmention Components:**

- What's not tested: `WebmentionFeed.astro`, `WebmentionCount.astro`
- Risk: External API changes could break display
- Priority: Medium
- Difficulty to test: Medium (requires mocking fetch API)

**Photo Gallery:**

- What's not tested: Photo upload script, gallery rendering, tag filtering
- Risk: Photo display issues, broken uploads
- Priority: Medium
- Difficulty to test: Medium (requires mock R2 or integration testing)

---

_Concerns audit: 2026-01-13_ _Update as issues are fixed or new ones discovered_
