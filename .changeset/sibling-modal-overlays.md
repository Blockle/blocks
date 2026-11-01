---
'@blockle/blocks': patch
'@blockle/blocks-react': patch
---

Only the `Dialog` or `Drawer` opened last handles clicks outside and Escape, wherever each one is mounted, so a click in a `Dialog` opened beside a `Drawer` no longer closes the `Drawer`. `usePreventBodyScroll` can now be enabled by more than one caller at a time: the body stays locked until the last one is disabled, then gets its styles and scroll position back.
