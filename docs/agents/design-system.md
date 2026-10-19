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
