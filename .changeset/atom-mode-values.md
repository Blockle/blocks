---
'@blockle/blocks-core': minor
'@blockle/blocks-react': minor
---

The `color`, `backgroundColor` and `borderColor` atoms accept a Mode value: a Palette shade for every Color mode, such as `color={{ light: 'neutral-900', dark: 'neutral-100' }}`. Each value compiles to one prebuilt class per mode, scoped to `data-color-mode` and to the `system` media query, so no inline styles are added. A plain string still means the same in every mode. `defineProperties` takes a `modeProperties` option to opt more properties in.
