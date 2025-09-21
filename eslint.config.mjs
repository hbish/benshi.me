import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginAstro from 'eslint-plugin-astro'
import astroParser from 'astro-eslint-parser'
import tsParser from '@typescript-eslint/parser'

export default [
  // Base JavaScript recommendations
  js.configs.recommended,

  // TypeScript recommendations
  ...tseslint.configs.recommended,

  // Astro recommendations
  ...eslintPluginAstro.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    rules: {
      // Code style
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',

      // TypeScript specific
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Import organization
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
    },
  },

  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      // Astro specific rules
      'astro/no-conflict-set-directives': 'error',
      'astro/no-unused-define-vars-in-style': 'error',
      'astro/valid-compile': 'error',
      'astro/no-deprecated-astro-fetchcontent': 'error',
      'astro/no-deprecated-astro-canonicalurl': 'error',
      'astro/no-deprecated-astro-resolve': 'error',
      'astro/no-deprecated-getentrybyslug': 'error',

      // Allow unused vars in Astro frontmatter for now
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': 'off',
    },
  },

  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        Response: 'readonly', // For Astro API routes
      },
    },
    rules: {
      // Allow require in CommonJS files
      '@typescript-eslint/no-var-requires': 'off',
      'no-console': 'off',
    },
  },

  // Ignore patterns
  {
    ignores: [
      'dist/',
      '.astro/',
      'node_modules/',
      'public/',
      '*.config.*',
      'src/env.d.ts',
      'src/content/**/*.md',
      'src/content/**/*.mdx',
    ],
  },
]
