---
'@blockle/blocks-react': minor
'@blockle/blocks': minor
---

Menu radio groups are generic over their value type: `MenuRadioGroupItem<V>` and `MenuRadioItem<V>` share one `V extends string` (default `string`). The new `menuRadioGroup()` helper infers `V` from `value` and `onChange`, so a setter typed with a union such as `'light' | 'dark' | 'system'` works without a cast and item values are checked against the union.
