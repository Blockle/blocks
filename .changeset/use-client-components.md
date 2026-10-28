---
'@blockle/blocks': patch
'@blockle/blocks-react': patch
---

Add the `'use client'` directive to every module that calls or defines a hook or creates a context. Importing from `@blockle/blocks-react` in a Server Component no longer evaluates `ToastContext` on the server, and `Drawer`, `NumericInput`, `Heading`, `Text`, and `IconMask` are now client components.
