---
'@blockle/blocks-react': patch
'@blockle/blocks': patch
---

Slider: dragging and the filled track and thumb now respect a non-zero `min`. Pointer input maps onto `min..max`, and the fill and thumb sit at `(value - min) / (max - min)`.
