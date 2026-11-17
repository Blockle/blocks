---
'@blockle/blocks-react': patch
'@blockle/blocks': patch
---

Textarea: `grow` drops the theme's minimum height, so a growing textarea starts one line tall and grows with its content up to `maxBlockSize`. A Textarea without `grow` keeps the theme's minimum height.
