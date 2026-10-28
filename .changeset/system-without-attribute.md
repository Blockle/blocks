---
'@blockle/blocks-core': patch
'@blockle/blocks-react': patch
---

A page without `data-color-mode` on `<html>` (server-rendered HTML and the paint before `BlocksProvider` mounts) now behaves exactly like `system`: role colors and Mode values follow `prefers-color-scheme`, and `color-scheme` is `light dark`. Previously it rendered light until hydration, so dark-OS users saw a flash.
