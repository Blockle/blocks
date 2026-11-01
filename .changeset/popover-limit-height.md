---
'@blockle/blocks': minor
'@blockle/blocks-react': minor
---

Add `limitHeight` to `Popover`: it caps the popover's height to the room on the side it opens on, so a tall popover stops at the viewport's edge instead of running off it. `Menu` uses it, so a long Menu now stops at the bottom (or top) of the screen and scrolls.
