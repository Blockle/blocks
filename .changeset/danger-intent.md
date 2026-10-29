---
'@blockle/blocks': minor
'@blockle/blocks-core': minor
'@blockle/blocks-react': minor
'@blockle/blocks-theme-momotaro': minor
---

`Alert` and `Toast` now use `intent="danger"` for errors, the same name `Button` uses. `intent="error"` is removed: replace it with `intent="danger"` (also in `showToast({ intent })`).

Blocks core exports the shared `Intent` type (`primary`, `secondary`, `neutral`, `danger`, `success`, `info`, `warning`), matching the Color role groups; every component's `intent` accepts a subset of it. Custom themes that style `alert.variants.intent.error` must rename that key to `danger`.
