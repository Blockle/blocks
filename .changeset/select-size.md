---
'@blockle/blocks': patch
'@blockle/blocks-core': patch
'@blockle/blocks-react': patch
'@blockle/blocks-theme-momotaro': patch
---

`Select` now takes a `size` prop (`small`, `medium` or `large`, default `medium`) like `Button`. In momotaro the sizes are 40, 48 and 56px high with the same inline padding as the matching `Button` size.

**Breaking:** the native numeric `size` attribute (visible row count) is no longer accepted on `Select`; `size={4}` is now a type error.

**Visual change:** a `Select` without `size` is now `medium`, 48px high instead of 40px, with wider inline padding. Pass `size="small"` to keep the previous look.
