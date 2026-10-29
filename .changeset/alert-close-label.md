---
'@blockle/blocks': minor
'@blockle/blocks-react': minor
---

`Alert`'s close button now has an accessible name, so screen readers announce it as "Close" instead of just "button". This includes the close button on every toast. Pass `closeLabel` to use your own wording, for example `closeLabel="Sluiten"`.
