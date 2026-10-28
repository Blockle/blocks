---
'@blockle/blocks': major
'@blockle/blocks-core': major
'@blockle/blocks-react': major
'@blockle/blocks-theme-momotaro': major
---

Adds Color modes (`light`, `dark`, `system`) and Color roles. This is a breaking release; read the notes below when upgrading.

**Color modes.** `BlocksProvider` takes a `colorMode` prop (`light`, `dark` or `system`) and the outermost provider writes it as `data-color-mode` on `<html>`. A nested provider ignores it and warns in development. `makeTheme` emits the role values on `<html>`, scoped to `data-color-mode`, and sets `color-scheme` to match. A page without `data-color-mode` (server-rendered HTML and the paint before `BlocksProvider` mounts) behaves like `system`, so dark-OS users see no flash.

**BlocksProvider now defaults to `colorMode="system"`.** Without a `colorMode` prop the page follows the OS preference. An app that was only designed and tested in light mode will render dark for users whose OS is set to dark. To keep the previous behavior, pass `colorMode="light"` to the outermost `BlocksProvider`. `useColorMode()` reports `colorMode: 'system'` in that case, and `resolvedColorMode` is `light` until the client takes over (server rendering and the first client render).

**Text and Heading** now apply the `text.default` role when they have no `color`, and `color` also accepts a text role such as `muted`. Both need a `BlocksProvider` with a theme (as the other components already did).

**Removed tokens.** The Palette is now the intent scales (`primary`, `secondary`, `neutral`, `danger`, `success`, `info`, `warning`) plus the fixed `white` and `black`. These are gone from `ThemeTokens.color`, `makeTheme`, `vars.color` and the `color`, `backgroundColor` and `borderColor` atoms:

- `background-100` to `background-900`: use a surface role (`surface.default`, `surface.raised`, `surface.sunken`, `surface.inverse`) or a Mode value such as `{ light: 'neutral-100', dark: 'neutral-800' }`.
- `text-100` to `text-900`: use the text roles (`text.default`, `text.muted`, `text.disabled`, `text.inverse`); on `Text` and `Heading`, `color="muted"` and so on.
- `color.border`: use `border.default` or `border.strong`.
- `color.focus`: use `focusRing.color`.
- `vars.shadow` and `vars.focus.boxShadow`: use `vars.colorRole.shadow[1..5]` and `vars.colorRole.focusRing.boxShadow`.

Roles are read in component styles as `vars.colorRole.<group>.<role>`.

**New theme input.** `makeTheme` requires `tokens.colorRoles` with a value for both `light` and `dark` for every role: `text`, `surface`, `border`, `focusRing`, `overlay`, `shadow` (1 to 5) and the seven `intent*` families (`solid`, `solidHover`, `subtle`, `contrast`, `foreground`, `border`). Values are Palette references (`neutral-900`, `white`) or raw CSS colors. Custom themes must drop the removed tokens and add these.

**`colorScheme` is now `intent`** on `Slider` and `Tooltip` and in their component themes (there is no alias).

**Visual changes in light mode** from moving the momotaro components onto roles (Skeleton's default background is a per-mode neutral; Dialog backdrop opacity is 0.4; Tooltip inverts per mode; Alert text, Progress, Link, checked controls and the success Button use slightly different shades; the secondary solid Button has dark text; the focus ring is a slightly darker purple (`#8660FF`, primary-400, 4.1:1 on white) instead of primary-300, and cyan in dark mode; solid Buttons of every intent hover to `solidHover`). Dialog, Drawer and Popover now set an explicit text color.
