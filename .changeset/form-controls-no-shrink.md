---
'@blockle/blocks': patch
'@blockle/blocks-react': patch
---

`Checkbox`, `Radio` and `Switch` no longer shrink in a flex row beside text that wraps. Their root now sets `flex-shrink: 0`, so consumers can drop `flexShrink: 0` workarounds passed through `className`.
