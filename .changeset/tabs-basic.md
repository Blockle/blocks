---
'@blockle/blocks': minor
'@blockle/blocks-core': minor
'@blockle/blocks-react': minor
'@blockle/blocks-theme-momotaro': minor
---

Add `Tabs`, `TabList`, `Tab` and `TabPanel` for in-page tabs, and `TabNav` for route tabs. Tabs are matched to panels by a string `value`, the selection is controlled with `value`/`onValueChange` or left uncontrolled with `defaultValue`, and inactive panels stay mounted. In a `TabNav`, a `Tab` is a link (any router link through `asChild`) and `current` marks the current page. Both draw a moving Tab indicator and scroll sideways when they overflow. Styled by the new `tabs` component theme.
