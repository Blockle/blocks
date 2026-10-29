---
'@blockle/blocks': minor
'@blockle/blocks-core': minor
'@blockle/blocks-react': minor
'@blockle/blocks-theme-momotaro': minor
---

`Link` takes `intent` in place of `variant`, accepting `primary`, `neutral` or `inherit`, the same name `Button` uses for its color. This is a breaking rename with no alias: replace `variant="primary"` and `variant="inherit"` with `intent="primary"` and `intent="inherit"`. `secondary` is gone; use `primary` for a prominent link, or the new `neutral` for a subtle one in metadata, footers or breadcrumbs (momotaro draws it in `neutral.foreground` with weight 500). momotaro still defaults to `primary`. The theme types' link `variant` becomes `intent`, and the `LinkVariant` type is removed, so a custom theme's `link` theme needs `primary`, `neutral` and `inherit` intent styles.
