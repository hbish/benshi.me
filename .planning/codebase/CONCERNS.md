# Codebase Concerns

**Analysis Date:** 2026-01-11

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
- Files: `src/components/Sidebar.astro` (277 lines), `src/components/WebmentionFeed.astro` (250+
  lines), `src/pages/[...slug].astro` (214 lines)
- Why: Organic growth without refactoring
- Impact: Difficult to understand and maintain
- Fix approach: Split into smaller focused components

**No Test Suite:**

- Issue: Entire codebase lacks automated tests
- Impact: No regression protection, risky refactoring
- Fix approach: Add Vitest for unit tests, start with utility functions

## Known Bugs

**None detected** - No obvious bugs found during analysis

## Security Considerations

**Hardcoded Contact Information:**

- Risk: Email address and social links scattered throughout components
- Files: `src/components/Sidebar.astro` (ben@hbish.com), `src/components/Header.astro` (webmention
  endpoints)
- Current mitigation: None - values are public anyway
- Recommendations: Consider centralizing in `src/consts.ts` or config for easier updates

**External Image Loading:**

- Risk: WebmentionFeed loads external avatar images from webmention.io without validation
- Files: `src/components/WebmentionFeed.astro`
- Current mitigation: Images rendered as <img> tags (browser handles)
- Recommendations: Consider adding CSP headers if deploying to platforms that support it

## Performance Bottlenecks

**Tags Page Filtering:**

- Problem: `src/pages/tags/[tag].astro` loads all content then filters in JavaScript
- File: `src/pages/tags/[tag].astro`
- Measurement: Could slow down as content grows
- Cause: Client-side filtering of all posts/notes
- Improvement path: Use Astro's built-in collection filtering in `getStaticPaths()`

**Random Sorting Algorithm:**

- Problem: `src/pages/404.astro` uses `Math.random() - 0.5` which is not a proper shuffle
- File: `src/pages/404.astro`
- Cause: Common misconception about random shuffling
- Improvement path: Use Fisher-Yates shuffle algorithm

**Uncached Webmention Fetches:**

- Problem: WebmentionFeed and WebmentionCount make separate API calls without client-side caching
- Files: `src/components/WebmentionFeed.astro`, `src/components/WebmentionCount.astro`
- Cause: Each component independently fetches from webmention.io
- Improvement path: Implement shared caching layer or combine fetches

## Fragile Areas

**Webmention Fetching:**

- Why fragile: External API dependency with no error handling
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

## Dependencies at Risk

**Outdated Tailwind CSS:**

- Risk: Using v3.0.24 (quite old, current is v3.4+)
- Impact: Missing performance improvements and features
- Migration plan: Upgrade to latest Tailwind CSS v3

**No Dependency Scanning:**

- Risk: No automated checking for known vulnerabilities
- Impact: Vulnerable dependencies could go undetected
- Migration plan: Add `pnpm audit` to CI or pre-commit hooks

## Missing Critical Features

**No Error Pages for Build Failures:**

- Problem: No custom handling for build errors beyond Astro defaults
- Current workaround: Build fails, check console output
- Blocks: Nothing (build errors are fatal anyway)
- Implementation complexity: Low (Astro has built-in error handling)

**No Content Search:**

- Problem: Users cannot search posts/notes
- Current workaround: Manual browsing through archives/tags
- Blocks: Content discovery
- Implementation complexity: Medium (would require search index or external service)

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

---

_Concerns audit: 2026-01-11_ _Update as issues are fixed or new ones discovered_
