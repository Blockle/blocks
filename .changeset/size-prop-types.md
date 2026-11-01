---
'@blockle/blocks': patch
'@blockle/blocks-react': patch
---

`Drawer`, `Dialog` and `Label` accept their theme `size` variants in TypeScript. Their `size` prop clashed with the native HTML `size` attribute, so it only accepted `undefined`.
