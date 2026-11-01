---
'@blockle/blocks': patch
'@blockle/blocks-react': patch
---

A server-rendered open `Dialog` or `Drawer` now hydrates without a hydration mismatch error for its `open` attribute, and opens as modal without firing a stray `close` event on the `<dialog>`.
