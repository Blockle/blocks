---
'@blockle/blocks': minor
'@blockle/blocks-react': minor
---

`Popover` and `Tooltip` take a `placement`: a side (`top`, `bottom`, `left`, `right`), optionally lined up with the anchor's `start` or `end` edge, as in `bottom-start`. A bare side centres the popover on the anchor, as before. The type is exported as `PopoverPlacement`. `position` still works but is deprecated; `placement` wins when both are passed.

The popover now stays inside the viewport: it shifts along the anchor's side to keep at least 8px from the viewport's edges, and a popover bigger than the viewport starts 8px from its start edge. Flipping to the other side keeps the edge, so `top-start` without room above becomes `bottom-start`, and only flips when the other side has more room.
