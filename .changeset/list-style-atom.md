---
'@blockle/blocks': minor
'@blockle/blocks-core': minor
'@blockle/blocks-react': minor
---

Add a `listStyle` atom (`none`). `Stack` and `Inline` with `tag="ul"` or `tag="ol"` now drop the list markers by default; a `className` setting `list-style` still overrides it. Pass `role="list"` when list semantics matter, as WebKit drops them for unstyled lists. `Inline` now accepts `role`.
