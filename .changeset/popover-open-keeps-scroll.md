---
'@blockle/blocks': patch
'@blockle/blocks-react': patch
---

Opening a `Menu`, or any `Popover` whose content moves focus into itself, no longer scrolls the page. `Popover` is now at its position before its content's effects run, rather than at the top of the page or where it was last open.
