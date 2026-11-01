---
'@blockle/blocks': minor
'@blockle/blocks-core': minor
'@blockle/blocks-react': patch
'@blockle/blocks-theme-momotaro': patch
---

Tabs and TabNav now get their mechanics from Blocks instead of the `tabs` Component theme: the row's layout and sideways scrolling, the Tab indicator's anchor positioning, slide and reduced-motion guard, the static fallback bar where anchor positioning is unsupported, and the inset focus rings. A `tabs` theme now sets only the look, and styles the Tab indicator through the new `tabIndicatorVars` (`color`, `thickness`, `duration`, `easing`) from `@blockle/blocks-core`, set on `list`. Its `navList` and `indicator` keys are now optional. Tabs look the same under momotaro.
