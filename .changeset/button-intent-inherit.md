---
'@blockle/blocks': minor
'@blockle/blocks-core': minor
'@blockle/blocks-react': minor
'@blockle/blocks-theme-momotaro': minor
---

`Button` and `IconButton` accept `intent="inherit"` to take the surrounding text color, such as an `Alert`'s or a `Tag`'s. It needs an explicit `variant="ghost"` or `variant="outline"`; without a variant, or with `solid`, it's a type error. The theme types' button `intent` gains `'inherit'`, so a custom theme's `button` and `iconButton` themes need an `inherit` intent style; the core `Intent` type is unchanged. momotaro draws the text and outline border in `currentColor` and tints the hover background with it.
