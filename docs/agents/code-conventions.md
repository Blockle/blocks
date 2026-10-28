# Code conventions

These conventions capture project choices that Biome does not enforce. Biome remains the source of truth for formatting and lint rules; run `npm run lint` to check them.

## Control flow and spacing

- Always use braces for `if`, `else`, and loop bodies, including bodies containing only a single statement or guard return. Apply this rule to new and changed code, including where existing code uses a brace-less guard.
- Put a blank line between adjacent function declarations or expressions. Use blank lines to separate distinct logical steps, and keep closely related statements together.

## Function syntax

The codebase uses both named function declarations and `const` arrow functions. There is no project-wide preference between them; do not convert code solely to change its function form.

## TypeScript and React

- Start a file in `packages/react/src` with `'use client';` when it calls or defines any hook, whether built-in (including server-safe ones like `useId` or `useMemo`) or custom (such as `useComponentStyles`), or when it calls `createContext`. This is a published package: a Server Component that imports anything from the package entry makes the bundler evaluate every module re-exported from it, stopping only at `'use client'` modules, so an unmarked hook or context module can crash the import (React's server build has no `createContext`). See [Button.tsx](../../packages/react/src/components/form/Button/Button.tsx) and [useTheme.ts](../../packages/react/src/hooks/useTheme/useTheme.ts).
- Keep public APIs explicitly typed, including exported component prop types. For React components, compose custom props with the appropriate native element props and omit conflicting native names where needed. See [Button.tsx](../../packages/react/src/components/form/Button/Button.tsx).
- Separate atomic styling props from DOM props with the existing helpers before spreading props onto an element. For polymorphic React components, use the existing `createSlottable` and `asChild` pattern. See [Box.tsx](../../packages/react/src/components/layout/Box/Box.tsx).
- Keep React component styles in colocated Vanilla Extract files. Use shared layers and tokens, and route themed variants through `useComponentStyles`. See [Button.css.ts](../../packages/react/src/components/form/Button/Button.css.ts).
- Test component behavior with Vitest and Testing Library, using the shared React render helper and semantic queries. Update Storybook stories when changing user-facing component behavior. See [Button.test.tsx](../../packages/react/src/components/form/Button/Button.test.tsx).
- Preserve package boundaries: React UI belongs in `packages/react`, framework-independent utilities in `packages/core`, and themes in theme packages. Keep public exports explicit, including prop types.
