# Design-system context

Blocks is a React design system built around modern CSS and HTML, Vanilla Extract, design tokens, and custom themes with component-level styling.

## Components and styling

- Follow the existing React component patterns and keep component styles in colocated Vanilla Extract files. See [code conventions](./code-conventions.md) for implementation conventions.
- Reuse the theme system: shared tokens express design values, and component themes provide component-specific styling. Keep new styling integrated with these systems rather than introducing parallel mechanisms.
- Prefer native HTML and browser capabilities where they suit the interaction. Use modern CSS and HTML features supported by current evergreen browsers; older-browser support is not a goal. Add a simple fallback when it is straightforward, but avoid disproportionate compatibility work or polyfills.

## Design and scope

- Treat the existing architecture as the preferred direction, not a constraint against well-justified improvement. Explain a significant departure and why it helps.
- When working on a feature or bug, offer concise, relevant feedback about design-system improvements, risks, or alternatives. Keep implementation scoped to the request unless broader work is requested.
- This package currently serves the maintainer's hobby project. Breaking changes are acceptable; call out their impact when they affect public APIs or existing usage.

## Component themes and base styles

A component's base styles, in a `.css.ts` next to it in `packages/react` and inside `layers.molecule`, hold everything without which the component breaks. Its Component theme holds only the look, and wins over the base where they overlap.

### Writing a theme in `blockle-theme`

Precedence is defaults < theme < props < your own CSS (ADR-0007). The layers, lowest priority first: `blockle-reset` < `blockle-molecule` (base styles) < `blockle-theme` (Component themes) < `blockle-atom` (Atoms) < `blockle-organism` (unused). An app's unlayered styles beat all of them.

- **Wrap every theme declaration by hand** in `'@layer': { [layers.theme]: … }`, with `layers` from `@blockle/blocks-core`. That covers roots, slots, variants, compound variants, shared helper classes (each piece used in `style([...])` gets its own wrapper), and every `globalStyle`. Pseudo-classes, pseudo-elements, `selectors`, `@media` and `@starting-style` go inside the layer block. `keyframes` stay unlayered. There is no helper.
- **Don't use `atoms()` in a theme.** An Atom class sits in `blockle-atom` and ties with an app's Atom props. Write the same value with `vars` (for example `vars.space[2]`) inside the theme layer.
- **An unlayered theme** (plain `style()`) beats Atoms and ties with app styles, as before. Nothing detects it.
- The "Writing a theme" Storybook page (`packages/react/src/docs/WritingATheme.mdx`) and the `create-component-theme` skill describe the same pattern.

### `tabs`

- **A `tabs` theme sets** the look: the baseline, colours, padding, type, hover, the selected tab's text style and focus rings. It sets the Tab indicator's look once, on `list`, through `tabIndicatorVars` from `@blockle/blocks-core`: `color`, `thickness`, `duration` and `easing` of the slide. Leave one out and the Tab indicator goes without it: no colour or thickness hides the bar, no duration makes it jump.
- **It needn't set** the mechanics, which the base styles in `packages/react/src/components/navigation/Tabs/tabs.css.ts` own: the row's flex layout and sideways scrolling, the Tab indicator's anchor positioning and its `@supports` gate, the slide's `transition-property` and its `prefers-reduced-motion` guard, the static fallback bar where anchor positioning is unsupported, the TabNav list reset, and the inset `outline-offset` that keeps focus rings from being clipped by the scrolling row. `navList` and `indicator` are optional theme keys for that reason.
- **The inset ring is the one place the base beats the theme.** Its `outline-offset: -2px` is `!important`: themes are unlayered (ADR-0007's `blockle-theme` layer isn't implemented yet), and a theme's ring, such as momotaro's `focusable` or an IconButton's, sets its own outward offset, which the scrolling row would clip. The theme still owns the ring's colour and width.
- **`tabIndicatorVars` lives in `core`, not next to Tabs (ADR-0003),** because Component themes depend on `core` and not on `@blockle/blocks-react`, so a var a theme sets has to come from `core`.
