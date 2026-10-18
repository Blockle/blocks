---
'@blockle/blocks': minor
'@blockle/blocks-react': minor
---

`BlocksProvider` accepts `colorScheme` (`light`, `dark` or `system`). Without it, a provider inherits its parent's scheme, or uses `system` at the top level. The provider renders `data-color-scheme` and now paints the `surface` background and `text` color. `Portal` content keeps the scheme of the place that opened it.
