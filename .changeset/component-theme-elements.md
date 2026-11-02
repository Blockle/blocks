---
'@blockle/blocks-core': minor
'@blockle/blocks-react': minor
'@blockle/blocks': minor
---

`getComponentStyles(theme, name, element, variants?)` and `useComponentStyles(name, element, variants?)` ask a Component theme for one Element by name, such as `useComponentStyles('tag', 'startSlot')` or `useComponentStyles('icon', 'root', { size })`. Variant classes, default variants and compound variants are added if and only if `variants` is passed, even as `{}`; the `useDefaultVariants` argument is gone. `variants` is only accepted for themes that declare variants. `ComponentThemesProps` is replaced by `ComponentThemeElement` and `ComponentThemeVariantsArg`.

Every Component theme in `ThemeComponentsStyles` is now required, so a theme that leaves one out no longer compiles. The per-render warning for a missing Component theme is removed. `IconMask` now applies the theme's `icon.root` class.
