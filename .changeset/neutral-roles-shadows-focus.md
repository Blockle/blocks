---
'@blockle/blocks-core': major
'@blockle/blocks-theme-momotaro': minor
---

Breaking for custom themes: `shadow` and `focus.boxShadow` move into `colorRoles` (`colorRoles.shadow`, `colorRoles.focusRing.boxShadow`) and take a `light` and `dark` value each. New required roles: `surface` (`default`, `raised`, `sunken`, `inverse`), `border` (`default`, `strong`), `focusRing` (`color`, `boxShadow`) and `overlay` (`default`). Momotaro provides light and dark values.
