---
'@blockle/blocks': patch
'@blockle/blocks-core': minor
'@blockle/blocks-theme-momotaro': minor
---

Breaking for custom themes: `typography.lineHeight` keys are now `compact`, `snug`, `normal` and `relaxed` (unitless ratios), replacing `xsmall` to `display`. Color tokens are replaced by Color roles in this release; see the "Light and dark Color schemes" migration notes.
