---
'@blockle/blocks': patch
'@blockle/blocks-react': patch
---

`Dialog`, `Drawer` and `Popover` now close on an outside click only when the press both starts and ends outside them. A click whose own handler removes its target, or a text selection dragged out of the overlay, no longer closes it.
