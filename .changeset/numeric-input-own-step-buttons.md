---
'@blockle/blocks': minor
'@blockle/blocks-react': minor
---

Remove `startSlot` and `endSlot` from `NumericInput`. The step buttons are `NumericInput`'s own, so these props used to silently replace them; passing either is now a type error.

A consumer `onKeyDown` no longer turns off Shift+↑/↓ stepping by 10: both handlers run, yours first. Call `event.preventDefault()` in yours to skip the stepping for that key press.
