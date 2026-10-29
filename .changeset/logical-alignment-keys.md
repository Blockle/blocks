---
'@blockle/blocks': major
'@blockle/blocks-core': major
'@blockle/blocks-react': major
---

Alignment uses logical `start` and `end` keys instead of `left` and `right`, so it follows the writing direction and reads the same on both axes.

- `Inline` `alignX` and `alignY`, and `Stack` `alignX`, take `start | end | center` (plus `between | around` for `justify-content` and `stretch` for `align-items`). Replace `left` with `start` and `right` with `end`. For example, `<Inline alignY="left">`, which aligned items to the top, becomes `<Inline alignY="start">`.
- `justifyContentMap` and `alignItemsMap` from `@blockle/blocks-core` have `start` and `end` keys instead of `left` and `right`.
- The `textAlign` atom takes `start | end | center | justify` and renders `text-align: start` or `end`. Replace `textAlign="left"` with `"start"` and `"right"` with `"end"`.
- `Stack` takes `alignY` (`start | end | center | between | around`), which sets `justify-content` along the column, for example `<Stack gap={2} alignY="between">`.
