---
'@blockle/blocks': patch
'@blockle/blocks-react': patch
---

Keep a `Popover` wider than the viewport on screen: its width is now capped to the viewport, 8px inside both edges, the same inset its positioning keeps. The cap fits the panel's border box whatever its `box-sizing`, follows viewport resizes while open, and lets the content wrap or scroll inside the panel. Popovers that already fit keep their size and position.
