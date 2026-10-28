---
'@blockle/blocks': minor
'@blockle/blocks-react': minor
---

Adds the `useColorMode()` hook, which returns `{ colorMode, resolvedColorMode }`. `colorMode` is what the outermost `BlocksProvider` was given (`light`, `dark` or `system`); `resolvedColorMode` is always `light` or `dark` and, under `system`, follows `prefers-color-scheme` and updates when the OS preference changes. It is safe during server rendering (it returns `light` until the client takes over).
