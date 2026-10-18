---
'@blockle/blocks': major
'@blockle/blocks-core': major
'@blockle/blocks-react': major
'@blockle/blocks-theme-momotaro': major
---

Light and dark Color schemes, built on Color roles. Colors are now purpose-named roles (`surface`, `text`, `primaryHover`, `onPrimary`, …) with a value per Color scheme. The Palette is only the raw material theme authors build roles from.

## Migration

### Custom themes: `makeTheme` / `ThemeTokens`

`makeTheme` takes `{ name, tokens, palette, schemes, components }` instead of `{ name, tokens, components }`.

- `tokens` (`ThemeTokens`) holds only the scheme-independent tokens: `typography`, `spacing`, `transition` and `border`. It no longer has `color`, `shadow` or `focus`.
- `palette` (`PaletteTokens`) holds `white`, `black`, `neutral` and one 100–900 scale per Intent (`primary`, `secondary`, `danger`, `success`, `info`, `warning`).
- `schemes` holds `light` and `dark` (`SchemeTokens`). Each has `color` with every Color role and `shadow` with shadows 1–5.

The old `tokens.color.border` and `tokens.color.focus` become the `border` and `focusRing` roles. `focus.boxShadow` is removed, along with `vars.focus`. Style focus indicators with `vars.color.focusRing`.

```ts
makeTheme({
  name: 'my-theme',
  tokens: { typography, spacing, transition, border },
  palette: { white, black, neutral, primary, secondary, danger, success, info, warning },
  schemes: {
    light: { color: { surface: palette.neutral[100], text: '#111', /* every role */ }, shadow },
    dark: { color: { surface: '#111', text: palette.neutral[100], /* every role */ }, shadow },
  },
  components,
});
```

In component themes, read Palette shades from `vars.palette` (for example `vars.palette['primary-500']`). `vars.color` holds only Color roles.

### Removed `text` and `background` palettes

The `text` and `background` Palette scales are removed. Use the roles instead: `text`, `textMuted`, `textInverse`, `textDisabled`, `surface`, `surfaceRaised`, `surfaceSunken` and `surfaceInverse`.

### Atoms accept only Color roles

`color`, `backgroundColor` and `borderColor` atoms (and `Box` props) accept only Color roles, `currentColor` and `transparent`. Palette values such as `'primary-500'`, `'neutral-200'` or `'white'` are now type errors. Pick the role that matches the purpose: for example `'primary'` for a solid fill, `'onPrimary'` for text on it, `'border'` for a divider line, or `'textMuted'` for secondary text.

### `Divider` and `IconMask` `color`

`Divider` `color` accepts only a Color role. `IconMask` `color` accepts a Color role or `currentColor`.

### `BlocksProvider` `colorScheme`

`BlocksProvider` accepts `colorScheme` (`light`, `dark` or `system`). Without it, a provider inherits its parent's scheme, or uses `system` at the top level. The provider renders `data-color-scheme` and now paints the `surface` background and `text` color. Apply the top-level provider to the whole page (for example `asChild` on `<body>`) so the page background follows the scheme, and remove background styles that clash with it.

`Portal` content keeps the scheme of the place that opened it. The provider that `Portal` adds uses `display: contents`, so it paints no box of its own.

`@blockle/blocks-core` exports the `ColorScheme` type and `colorSchemeAttribute` (`data-color-scheme`). `@blockle/blocks-react` still re-exports `ColorScheme`.

### Variant renames

- `Slider`: `colorScheme` → `intent`.
- `Link`: `variant` → `intent`.
- `Alert` and `Toast`: intent `error` → `danger`.

Component themes rename the same variant keys.

### `Tooltip` `colorScheme` removed

`Tooltip` no longer accepts `colorScheme`, and `TooltipTheme` has no variants. Tooltips always use the `surfaceInverse` and `textInverse` roles.

### Momotaro light values

Momotaro builds its surface and text roles from the `neutral` scale plus `white` and `black`, so a few light colors shift slightly: `surfaceSunken` `#F5F5F5` → `#F7F7F7`, `text` and `onWarning` `#0D0D0D` → `#000`, `textMuted` `#4C4C4C` → `#3C3C3C`, and `textDisabled` `#AEAEAE` → `#B1B1B1`. The secondary `Slider` track now uses `secondarySubtle` instead of the primary tint.
