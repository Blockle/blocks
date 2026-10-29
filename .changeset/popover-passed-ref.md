---
'@blockle/blocks': patch
'@blockle/blocks-react': patch
---

`Popover` keeps working when you pass it a `ref`. The passed `ref` used to replace `Popover`'s own, so the popover was never shown or positioned and ignored clicks outside. Now both refs receive the element.
