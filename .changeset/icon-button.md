---
'@blockle/blocks': minor
'@blockle/blocks-core': minor
'@blockle/blocks-react': minor
'@blockle/blocks-theme-momotaro': minor
---

Add `IconButton`, a square button for a single icon. It requires a `label`, rendered as `aria-label`, and supports the `variant`, `intent` and `size` of `Button` plus a `shape` of `square` (default) or `circle`. Like `Button`, it accepts `disabled`, `loading` (a spinner replaces the icon), `asChild`, `type`, margin atoms and HTML attributes. Themes style it through the new `iconButton` key in `ComponentThemes`; momotaro sizes it to match `Button`'s heights (40, 48 and 56px) and sizes a direct `svg` child per size.
