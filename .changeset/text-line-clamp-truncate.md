---
'@blockle/blocks': minor
'@blockle/blocks-core': minor
'@blockle/blocks-react': minor
---

`Text` and `Heading` take `lineClamp` (1 to 5), which caps the text at that many lines and ends it in an ellipsis, and `truncate`, which keeps the text on one line and ends the overflow in an ellipsis. `truncate` makes the element block-level, so it works on the default `span`. With both set, `lineClamp` applies and a development warning is logged. The atoms add `minInlineSize: 0`, which lets a flex item such as an `Inline` shrink below its content.
