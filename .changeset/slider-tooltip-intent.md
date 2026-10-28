---
'@blockle/blocks-react': major
'@blockle/blocks-core': major
'@blockle/blocks-theme-momotaro': major
---

Breaking: the `colorScheme` prop and component theme variant on `Slider` and `Tooltip` is renamed to `intent`, matching Button, Alert and Toast. There is no deprecated alias. Replace `<Slider colorScheme="secondary" />` with `<Slider intent="secondary" />`, and rename the `colorScheme` variant to `intent` in custom `slider` and `tooltip` component themes.
