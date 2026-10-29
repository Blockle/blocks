---
'@blockle/blocks': minor
'@blockle/blocks-react': minor
---

`Stack` and `Inline` now accept the HTML attributes of their element (`id`, `aria-*`, `data-*`, `role`, event handlers such as `onClick`), a `ref` typed `React.Ref<HTMLElement>`, and `asChild`. With `asChild`, the single child element is rendered with the layout classes merged onto it, and `tag` is ignored along with its defaults (the list-marker reset and `Stack`'s `start` check).
