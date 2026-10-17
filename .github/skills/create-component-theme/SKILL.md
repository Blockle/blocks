---
name: create-component-theme
description: "Create or extend a Blockle vanilla-extract component theme with variants, compound variants, defaults, and theme registration. Use when adding component styling, theme variants, or makeComponentTheme definitions in packages/theme-momotaro."
argument-hint: "Component name and variants, for example: add primary and danger variants to the Alert theme"
---

# Create Component Theme

Use this skill for component-level theme styles in `packages/theme-momotaro`. The React component owns its prop types; the theme package maps those variant names to vanilla-extract styles.

## Procedure

1. Identify the React component and read its exported props type from `packages/react/src/components/`. Treat the component's theme type as the source of valid variant keys and values.
2. Inspect a neighboring theme file, especially `packages/theme-momotaro/src/components/button.css.ts`, and check shared tokens in `packages/theme-momotaro/src/tokens.css.ts` or the relevant core theme files.
3. Create or update `packages/theme-momotaro/src/components/<component>.css.ts`:
   - Import `makeComponentTheme`, `ThemeComponentsStyles`, and only the core helpers/tokens needed.
   - Export a lowercase theme value typed as `ThemeComponentsStyles['<component>']`.
   - Put shared styles in `root`.
   - Put prop-backed styles in `variants` using the exact names and values from the React component's theme type.
   - Use `compoundVariants` only for combinations that cannot be expressed by one variant group.
   - Set `defaultVariants` for the component's documented defaults.
   - Prefer existing `atoms`, `vars`, helpers, and CSS variables over duplicated token values.
4. Register the theme in `packages/theme-momotaro/src/components/index.ts` with an import and an entry in `components`.
5. If the theme introduces a new token, add it through the existing token configuration instead of hard-coding an unrelated color or size.
6. Validate the theme and its integration:
   - Run the nearest theme test or add a focused test when behavior is new.
   - Run `npm run ts`.
   - Run `npm run lint`.
7. Check that every variant used by the React component has a corresponding theme definition, and that defaults do not create an invalid prop combination.

## Completion Checklist

- Variant keys exactly match the component's public theme props.
- The theme is registered in `components/index.ts`.
- Existing design tokens and helpers are reused.
- Compound and default variants are covered by validation.
