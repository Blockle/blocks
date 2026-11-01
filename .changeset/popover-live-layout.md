---
'@blockle/blocks': minor
'@blockle/blocks-react': minor
---

An open `Popover` now keeps its position, side and height cap up to date. It follows its anchor when the window is resized, when the page or any panel scrolls, when the anchor or the popover changes size, and when the visual viewport resizes, so `Menu` and `Tooltip` no longer drift away from their trigger. When the anchor scrolls out of view the popover keeps following it, held inside the viewport on both axes. Scrolling the popover's own content doesn't re-run the layout. `sticky` is deprecated and has no effect.
