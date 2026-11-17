---
'@blockle/blocks-react': patch
'@blockle/blocks': patch
---

`Tooltip` now passes its HTML props (`className`, `style`, `data-*`, `aria-*`) to the tooltip popover, the `role="tooltip"` element, instead of dropping them. `className` is merged with the tooltip theme class, and Tooltip keeps its own `id`, `role` and open state. `content` is typed as `React.ReactNode` again, so a node such as `<Stack>` no longer fails to type-check.
