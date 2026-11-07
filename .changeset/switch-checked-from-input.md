---
'@blockle/blocks': patch
'@blockle/blocks-react': patch
'@blockle/blocks-theme-momotaro': patch
---

`Switch` now looks on whenever its input is checked, however it was set. Before, it kept its own copy of the checked state, so setting `input.checked` through the ref (react-hook-form `register` with `defaultValues`, `reset()`, `setValue()`) or a native form reset left an on switch looking off. The momotaro theme now styles the track and thumb from `input:checked`, and `Switch` no longer renders `data-checked`.
