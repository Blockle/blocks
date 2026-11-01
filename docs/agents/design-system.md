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

### `tabs`

- **A `tabs` theme sets** the look: the baseline, colours, padding, type, hover, the selected tab's text style and focus rings. It sets the Tab indicator's look once, on `list`, through `tabIndicatorVars` from `@blockle/blocks-core`: `color`, `thickness`, `duration` and `easing` of the slide. Leave one out and the Tab indicator goes without it: no colour or thickness hides the bar, no duration makes it jump.
- **It needn't set** the mechanics, which the base styles in `packages/react/src/components/navigation/Tabs/tabs.css.ts` own: the row's flex layout and sideways scrolling, the Tab indicator's anchor positioning and its `@supports` gate, the slide's `transition-property` and its `prefers-reduced-motion` guard, the static fallback bar where anchor positioning is unsupported, the TabNav list reset, and the inset `outline-offset` that keeps focus rings from being clipped by the scrolling row. `navList` and `indicator` are optional theme keys for that reason.
- **The inset ring is the one place the base beats the theme.** Its `outline-offset: -2px` is `!important`: the base styles sit in `blockle-molecule`, below the theme in `blockle-theme`, and a theme's ring, such as momotaro's `focusable` or an IconButton's, sets its own outward offset, which the scrolling row would clip. An `!important` declaration in a lower layer beats a higher layer, so the `!important` is still needed. The theme still owns the ring's colour and width.
- **`tabIndicatorVars` lives in `core`, not next to Tabs (ADR-0003),** because Component themes depend on `core` and not on `@blockle/blocks-react`, so a var a theme sets has to come from `core`.
