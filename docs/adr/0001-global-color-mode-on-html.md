# One global Color mode, set on `<html>`

A Color mode applies to the whole page. Core defines the modes (`light` and `dark`), because atom classes are compiled in core and must know the mode names. Themes provide values for each mode. The mode is set as `data-color-mode` on `<html>`, so portaled content (Dialog, Popover, Toast) is covered without extra work. Only the outermost `BlocksProvider` sets it. Each mode's Color roles and Mode values, including shadows and the focus ring, are emitted under that attribute. Under `system`, the default, the dark values are emitted again inside `@media (prefers-color-scheme: dark)`, so following the OS needs no script and never shows the wrong mode on first paint. A dark section inside a light page uses inverse roles. It is not a nested mode.

## Considered Options

- **Nested local modes (nearest mode wins)**: rejected. Roles could follow them through CSS variables, but Mode values in atoms would need inline custom properties and a space-toggle trick, which breaks under a strict CSP and is hard to debug. Selector-based atom classes can't tell the nearest mode from an outer one.
- **CSS `light-dark()`**: rejected. It is limited to two modes, which would make a third mode a rewrite instead of an addition. It also only accepts colors.
- **Resolving `system` in a script (as Braid does)**: rejected. It needs a blocking `<head>` script in every app to avoid a flash. The CSS media query costs one extra copy of the dark values.
