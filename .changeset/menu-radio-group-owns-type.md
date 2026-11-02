---
'@blockle/blocks-react': minor
'@blockle/blocks': minor
---

`menuRadioGroup()` adds `type: 'radio-group'` itself, so callers no longer pass `type`. Passing `type` in an object literal is now a type error. Breaking for callers that restated `type: 'radio-group'` since 3.4.0. Plain `MenuRadioGroupItem` object literals still need `type`.
