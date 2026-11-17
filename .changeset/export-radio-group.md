---
'@blockle/blocks-react': patch
'@blockle/blocks': patch
---

`RadioGroup` and `RadioGroupProps` are now exported from the package. Wrap a set of `Radio`s in `RadioGroup` to give them the `radiogroup` role, and pass the id of a visible label as `aria-labelledby`.
