---
'@blockle/blocks': major
'@blockle/blocks-core': major
'@blockle/blocks-react': major
'@blockle/blocks-theme-momotaro': major
---

Adds the Intent Color role family. `ThemeTokens.colorRoles` now also requires `intentPrimary`, `intentSecondary`, `intentNeutral`, `intentDanger`, `intentSuccess`, `intentInfo` and `intentWarning`, each with `solid`, `solidHover`, `subtle`, `contrast`, `foreground` and `border`, and a value for every Color mode. They are available as `vars.colorRole.intentDanger.solid` and so on. Momotaro provides light and dark values; `contrast` on `solid` meets WCAG AA in both modes.
