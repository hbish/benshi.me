# Coding Conventions

**Analysis Date:** 2026-01-13

## Naming Patterns

**Files:**

- PascalCase.astro for Astro components - `Header.astro`, `ThemeToggle.astro`
- kebab-case.mjs for remark plugins - `remark-reading-time.mjs`
- camelCase.ts for TypeScript utilities - `extractFirstImage.ts`
- kebab-case.js for scripts - `validate-rss.js`
- kebab-case.md for content files - `life-update.md`

**Functions:**

- camelCase for all functions - `extractFirstImage()`, `getSavedTheme()`, `setTheme()`
- No special prefix for async functions
- Event handlers prefixed with `handle` - `handleThemeChange()`

**Variables:**

- camelCase for variables - `title`, `description`, `imageUrl`
- UPPER_SNAKE_CASE for constants - `THEME_KEY`, `DEFAULT_THEME`, `THEMES`
- No underscore prefix (no private marker in TS)

**Types:**

- PascalCase for interfaces - `Props`, `WebmentionData`
- PascalCase for type aliases - `ThemeType`, `CollectionEntry`
- No I prefix for interfaces

## Code Style

**Formatting:**

- Prettier with `.prettierrc.json`
- 2-space indentation (no tabs)
- Single quotes for strings
- No semicolons
- 80 character line width (100 for Astro/Markdown/JSON)
- ES5 trailing commas
- LF line endings

**Linting:**

- ESLint with `eslint.config.mjs` (flat config)
- Extends: `@eslint/js`, `typescript-eslint`, `eslint-plugin-astro`
- Custom rules:
  - `prefer-const`: error
  - `no-var`: error
  - `no-console`: warn (except in Astro files)
  - `@typescript-eslint/no-unused-vars`: error with `_` prefix exception
  - `sort-imports`: error
- Run: `pnpm lint` (with --fix) or `pnpm lint:check`

## Import Organization

**Order:**

1. External packages (astro, react-like imports if any)
2. Internal modules (@/ imports if using aliases)
3. Relative imports (./, ../)
4. Type imports (import type {})

**Grouping:**

- Blank lines between groups
- Sorted alphabetically within groups

**Path Aliases:**

- No explicit path aliases configured
- Uses relative imports: `../components/Header.astro`

## Error Handling

**Patterns:**

- Try/catch in async functions (webmention fetching)
- Zod validation for content schemas at build time
- Silent failure for webmention fetch errors (logged to console)

**Error Types:**

- Build errors fail loudly (Astro's default)
- Runtime errors caught with try/catch where appropriate
- No custom error classes defined

## Logging

**Framework:**

- console.log for development debugging
- No structured logging framework

**Patterns:**

- Build-time logs in remark plugins (`console.log(readingTime)`)
- No logging in production (static site)

## Comments

**When to Comment:**

- Explain why, not what
- Document JSDoc for utility functions
- Note implementation quirks or workarounds

**JSDoc/TSDoc:**

- Used for TypeScript utility functions - `src/utils/extractFirstImage.ts`:
  ```typescript
  /**
   * Extracts the first image from markdown content
   * @param content - The markdown content to parse
   * @returns The image path or null if no image found
   */
  ```
- Not required for simple component props (self-documenting)

**TODO Comments:**

- None detected in codebase

## Function Design

**Size:**

- Generally keep functions focused
- Some large components (Sidebar.astro is 281 lines)

**Parameters:**

- Destructure objects in parameter list: `function process({ id, name }: Props)`
- Props interfaces defined for components

**Return Values:**

- Explicit returns
- Early returns for guard clauses

## Module Design

**Exports:**

- Named exports preferred
- Default exports for some components

**Barrel Files:**

- No barrel files (index.ts) in use
- Direct imports from specific files

## Astro Component Conventions

**Frontmatter Fence:**

- `---` to separate frontmatter script from template

**Scoped Styles:**

- `<style>` tags within components for scoped CSS
- CSS variables for theming: `var(--color-bg)`, `var(--color-text)`
- Tailwind utility classes via `@apply` directive

**Client-Side Scripts:**

- `<script>` tags within components for interactivity
- `data-*` attributes for element selection
- Event delegation patterns in ThemeToggle, Sidebar

**Props Interface:**

- Define TypeScript interface in frontmatter
- Destructure from `Astro.props`

## CSS Conventions

**Theme Variables:**

- Use CSS custom properties: `var(--color-bg)`, `var(--color-text)`
- Utility classes: `.text-theme`, `.bg-theme`, `.text-theme-accent`

**Tailwind Usage:**

- Utility classes for layout and spacing
- `@apply` directive for reusable patterns
- Theme-aware variants: `dark:text-gray-200`

---

_Convention analysis: 2026-01-13_ _Update when patterns change_
