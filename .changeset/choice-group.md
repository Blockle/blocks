---
'@blockle/blocks-core': minor
'@blockle/blocks-react': minor
'@blockle/blocks-theme-momotaro': minor
'@blockle/blocks': minor
---

Add `ChoiceGroup` and `Choice`: a single-choice group of native radios drawn as buttons or colour swatches (`variant="swatch"` with a `color` per `Choice`). It takes `value`, `defaultValue` and `onValueChange` typed over a union of values, and needs `aria-label` or `aria-labelledby`. A `choiceGroup` Component theme (`root`, `item`, `swatch`, `variant`) and `choiceGroupVars.color` come with it, and momotaro implements both variants.
