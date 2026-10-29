---
'@blockle/blocks': patch
'@blockle/blocks-react': patch
---

Checkbox, Select, NumericInput and Toast now draw their built-in icons from one shared internal set, so their strokes stay consistent. The Checkbox check and Select chevron are now `aria-hidden` instead of `role="presentation"`. Rendering is unchanged.
