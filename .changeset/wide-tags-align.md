---
'@blockle/blocks-react': minor
'@blockle/blocks-core': minor
---

Widen layout and typography props.

- `Text`: added `code`, `kbd`, `mark`, `q` and `cite` to the supported `tag` values, so `Box asChild` is no longer needed to render them.
- `Stack` and `Inline`: now accept all `Box` atoms except `flexDirection` and `gap`, which is still required. This enables props like `backgroundColor` and `alignItems="baseline"`.
- `core`: added `baseline` to the `alignItems` and `alignSelf` atoms.
