---
'@blockle/blocks': major
'@blockle/blocks-core': major
'@blockle/blocks-react': major
'@blockle/blocks-theme-momotaro': major
---

Adds Color modes (`light`, `dark`, `system`) and the `text` Color roles.

Breaking for custom themes: `ThemeTokens` now requires `colorRoles.text` (`default`, `muted`, `disabled`, `inverse`), each with a value for every Color mode, written as Palette references such as `neutral-900`. `makeTheme` emits the role values on `<html>`, scoped to `data-color-mode`, and sets `color-scheme` to match.

`BlocksProvider` takes a `colorMode` prop (`light`, `dark` or `system`, default `light` for now) and the outermost provider writes it as `data-color-mode` on `<html>`. A nested provider ignores it and warns in development.

`Text` and `Heading` now apply the `text.default` role when they have no `color`, and `color` also accepts a text role such as `muted`. Both need a `BlocksProvider` with a theme (as the other components already did).
