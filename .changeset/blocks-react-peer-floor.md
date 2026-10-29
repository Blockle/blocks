---
'@blockle/blocks': patch
---

`@blockle/blocks` now requires `@blockle/blocks-react` `>=3.0.1` as a peer dependency. A project that still has `blocks-react` 3.0.0 installed, which crashes in Server Components, gets it upgraded (or a peer conflict reported) when it installs `@blockle/blocks`, instead of keeping the broken version.
