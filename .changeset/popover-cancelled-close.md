---
'@blockle/blocks': patch
'@blockle/blocks-react': patch
---

Unmount `Popover` once it closes even when its closing transition is cancelled, and no longer cut that transition short when a child's transition or animation ends.
