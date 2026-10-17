---
name: create-react-component
description: "Scaffold a new Blockle React component with implementation, vanilla-extract styles, Storybook stories, tests, and package exports. Use when creating, scaffolding, or adding a component to packages/react."
argument-hint: "Component name and category, for example: create a form DatePicker component"
---

# Create React Component

Use this skill for a new component in `packages/react`. Keep the implementation consistent with the nearest existing component and do not introduce a new abstraction unless the component needs one.

## Procedure

1. Confirm the component name, category, and whether it needs a theme entry. Use one of the existing categories under `packages/react/src/components/` when possible.
2. Inspect the nearest comparable component. For a general component, use `packages/react/src/components/form/Button/` as the structural reference. For behavior-heavy components, choose a nearby component with similar interaction and accessibility requirements.
3. Create the component directory with:
   - `<Component>.tsx` for the public component and props type
   - `<Component>.css.ts` for component-local vanilla-extract styles
   - `<Component>.stories.tsx` for representative Storybook stories
   - `<Component>.test.tsx` for focused Vitest and Testing Library coverage
4. Follow local conventions:
   - Use `.js` suffixes in imports.
   - Use `React.FC` and exported `<Component>Props` types where the neighboring component does.
   - Use `useComponentStyles`, `getAtomsAndProps`, `atoms`, and `classnames` when the component accepts the corresponding system props.
   - Preserve accessible native semantics, keyboard behavior, and `asChild`/slot patterns where applicable.
5. Add the component and props type to `packages/react/src/index.ts` in the appropriate category section.
6. If the component has theme variants, invoke the `create-component-theme` skill or add the theme in the same change using its procedure. Do not put theme variants in the React package.
7. Run focused validation first, then the repository checks as needed:
   - `npx vitest run packages/react/src/components/<category>/<Component>/<Component>.test.tsx`
   - `npm run ts`
   - `npm run lint`

## Completion Checklist

- Implementation, styles, story, and test are present.
- The public component and props type are exported from `packages/react/src/index.ts`.
- Tests cover rendering, important states, accessibility, and user interaction.
- No unrelated files were reformatted or changed.
