---
'@blockle/blocks': patch
'@blockle/blocks-react': patch
---

Add the `'use client'` directive to `Drawer`, `NumericInput`, `Heading`, `Text`, and `IconMask`, which call hooks, and drop it from hook-only modules so the client boundary sits at the component.
