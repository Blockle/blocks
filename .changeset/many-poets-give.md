---
"@blockle/blocks-react": patch
"@blockle/blocks": patch
---

- `Grid` accepts the same atoms as `Stack` and `Inline` (except `flexDirection`), and `display` can be overridden.
- `Grid` merges a custom `className` with its own styles instead of replacing them.
- `Grid` default columns use `minmax(0, 1fr)` so long content no longer widens tracks.
- `Textarea` `containerProps` accepts atoms.
- `Textarea` replaces `maxHeight` with `maxBlockSize` (same behaviour). Rename `maxHeight` to `maxBlockSize`.
