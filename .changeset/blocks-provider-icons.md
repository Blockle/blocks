---
'@blockle/blocks-react': minor
'@blockle/blocks-theme-momotaro': patch
'@blockle/blocks': minor
---

`BlocksProvider` takes an `icons` prop to replace the icons Blocks draws itself with your own: `check` (Checkbox), `chevronDown` (Select), `minus` and `plus` (NumericInput) and `close` (each Toast's close button), typed by the new `BlocksIcons` type. Pass rendered elements, such as `icons={{ check: <Check /> }}`, so a Server Component layout can pass them. Keys you leave out keep Blocks' icons, a nested `BlocksProvider` merges its `icons` over its parent's, and each component sizes and colors the icon you pass. Without `icons` nothing changes. Checkbox and Select now size their icons in their styles rather than inline, and momotaro's IconButton sizes these icons like a direct `svg`.
