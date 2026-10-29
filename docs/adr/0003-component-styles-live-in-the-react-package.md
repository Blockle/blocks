# Component styles live in the React package, next to their component

A component's styles (its `.css.ts` file and any helper that picks its classes, such as `textOverflowClassName` for `Text` and `Heading`) live in `packages/react`, next to the component. They don't move to `@blockle/blocks-core`, even when no React is involved. `core` holds what every component builds on: Atoms, tokens, layers and theming. Supporting a frontend framework other than React is hypothetical. If a port ever happens, all component styles split out together into a framework-free layer, with a thin React layer on top. Moving them one helper at a time would give `core` a mixed rule, with a few components' styles in `core` and the rest next to their components, and it would add public `core` exports that nobody needs yet.

## Consequences

- `core` is not free of React today: it exports `mergeProps` and `composeRefs` from `utils/react/`. They stay in `core` until a port, which would move them to the React layer as part of the same split.
- A shared style helper, such as `textOverflow.ts` and `textColor.ts` in `typography/`, sits in the nearest common folder in `packages/react`, not in `core`.
