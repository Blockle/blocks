---
'@blockle/blocks': patch
'@blockle/blocks-react': patch
---

`Popover` no longer throws when it closes where the Popover API is missing, such as in jsdom: it warns instead, as it already did when opening. The README documents how to test `Popover` in jsdom with a polyfill for `showPopover()`, `hidePopover()` and `togglePopover()` and a test stylesheet, so an open popover's content can be found by role.
