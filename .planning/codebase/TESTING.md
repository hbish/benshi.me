# Testing Patterns

**Analysis Date:** 2026-01-11

## Test Framework

**Runner:**

- Not detected - No test framework in use

**Assertion Library:**

- Not detected

**Run Commands:**

```bash
# No test commands available
# Tests would be added here in the future
```

## Test File Organization

**Location:**

- No test files exist in the codebase

**Naming:**

- No naming patterns established

**Structure:**

```
# No test structure - would be:
src/
  components/
    Header.astro
    Header.test.ts  # Does not exist
```

## Test Structure

**Suite Organization:**

- Not applicable

**Patterns:**

- Not applicable

## Mocking

**Framework:**

- Not detected

**Patterns:**

- Not applicable

## Fixtures and Factories

**Test Data:**

- Not detected

## Coverage

**Requirements:**

- No enforced coverage target
- No coverage tools configured

**Configuration:**

- Not applicable

**View Coverage:**

- Not applicable

## Test Types

**Unit Tests:**

- Not detected - No unit tests exist

**Integration Tests:**

- Not detected - No integration tests exist

**E2E Tests:**

- Not detected - No E2E tests exist

## Validation (Existing)

Instead of automated tests, the project uses:

**Build Validation:**

- `pnpm build` - Builds site and catches TypeScript errors
- `astro check` - Type checking (via `pnpm check` script)

**Feed Validation:**

- `scripts/validate-rss.js` - Validates RSS feed structure
- `scripts/validate-json-feed.js` - Validates JSON Feed structure

**Code Quality:**

- ESLint via `pnpm lint` and pre-commit hooks
- Prettier via `pnpm format` and pre-commit hooks
- Husky + lint-staged for pre-commit validation

**Content Validation:**

- Zod schemas in `src/content/config.ts` validate frontmatter at build time

## Common Patterns

**No testing patterns exist in this codebase.** The project relies on:

1. TypeScript for type safety
2. Zod for runtime schema validation
3. ESLint/Prettier for code quality
4. Build-time checks for errors

## Recommendations

To add testing to this project, consider:

1. **Framework Choice:** Vitest for unit tests, Playwright for E2E
2. **Test Location:** Co-locate with source files (`*.test.ts`) or use `__tests__/` directory
3. **Coverage Tools:** Vitest's built-in coverage with c8
4. **Priority Areas:**
   - Utility functions in `src/utils/`
   - Remark plugins in `remark-plugins/`
   - Critical component logic (ThemeToggle, webmention fetching)
   - Content rendering and routing

---

_Testing analysis: 2026-01-11_ _Update when test patterns change_
