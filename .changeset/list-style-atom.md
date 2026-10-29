---
'@blockle/blocks': minor
'@blockle/blocks-core': minor
'@blockle/blocks-react': minor
---

Add a `listStyle` atom (`none`) to drop list markers, for example `<Stack asChild gap={2} listStyle="none"><ul>…</ul></Stack>`; a `className` setting `list-style` still overrides it. Pass `role="list"` when list semantics matter, as WebKit drops them for unstyled lists. `Inline` now accepts `role`.
