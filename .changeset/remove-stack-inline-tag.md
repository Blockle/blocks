---
'@blockle/blocks': minor
'@blockle/blocks-react': minor
---

Remove `tag` from `Stack` and `Inline`, and `start` from `Stack`. They render a `div`; choose another element with `asChild`. Lists no longer drop their markers automatically, so pass `listStyle="none"` (and `role="list"` when list semantics matter).

```tsx
// Before
<Stack tag="ul" gap={2}>…</Stack>
<Inline tag="nav" gap={2}>…</Inline>
<Stack tag="ol" start={3} gap={2}>…</Stack>

// After
<Stack asChild gap={2} listStyle="none"><ul>…</ul></Stack>
<Inline asChild gap={2}><nav>…</nav></Inline>
<Stack asChild gap={2} listStyle="none"><ol start={3}>…</ol></Stack>
```
