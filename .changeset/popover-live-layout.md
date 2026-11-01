---
'@blockle/blocks': minor
'@blockle/blocks-react': minor
---

An open `Popover` now keeps its position, side and height cap up to date. It follows its anchor when the window is resized, when the page or any panel scrolls, when the anchor or the popover changes size, and when the visual viewport resizes, so `Menu` and `Tooltip` no longer drift away from their trigger. `sticky` is deprecated and has no effect.
