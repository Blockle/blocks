---
'@blockle/blocks-core': patch
'@blockle/blocks': patch
---

Responsive classes for object-valued Atoms, such as `padding={[1, 2]}`, `fontSize` and `letterSpacing`, now sit in the `blockle-atom` cascade layer like every other Atom class. An app's own unlayered `className` beats them regardless of stylesheet order.
