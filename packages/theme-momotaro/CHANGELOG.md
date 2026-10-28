# @blockle/blocks-theme-momotaro

## 7.0.0

### Major Changes

- c7efbac: Adds Color modes (`light`, `dark`, `system`) and Color roles. This is a breaking release; read the notes below when upgrading.

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

### Minor Changes

- b5a3008: Breaking for custom themes: `typography.lineHeight` keys are now `compact`, `snug`, `normal` and `relaxed` (unitless ratios), replacing `xsmall` to `display`.

## 6.3.1

### Patch Changes

- 743d435: Align `@blockle/blocks-core` peer dependency ranges with the current major, and declare the Momotaro theme as an optional peer of `@blockle/blocks`.

## 6.3.0

### Minor Changes

- 75aa633: - Add a `letterSpacing` atom backed by a new `typography.letterSpacing` theme token (`tight`, `normal`, `wide`, `wider`).
  - Add a fluid `display` step to `typography.fontSize` and `typography.lineHeight`, available through the `fontSize` and `lineHeight` atoms.
  - `Label` uses the `wide` letter spacing token.
  - Breaking for custom themes: `typography.letterSpacing`, `typography.fontSize.display` and `typography.lineHeight.display` are now required in `ThemeTokens`.

## 6.2.6

### Patch Changes

- 3bd1c36: Introducing grow for TextArea and css reset improvements

## 6.2.5

### Patch Changes

- 9df99ee: Divider added size variants, children and alignment

## 6.2.4

### Patch Changes

- ccb1694: Test release

## 6.2.3

### Patch Changes

- 8c094b8: Drawer prototype

## 6.2.2

### Patch Changes

- 03182b7: Renamed base → root across all component themes for consistency
  Updated typography tokens: primary → heading, secondary → mono
  Converted shadow values from semantic (small, medium, large) to numeric scale (1-5)
  Enhanced button variants: added secondary and success options

## 6.2.1

### Patch Changes

- 962d6f3: - Accessibility: Updated Momotaro theme neutral buttons for WCAG AA contrast compliance.
  - Breaking Change: Renamed rem() to pixelsToRem() in @blockle/blocks-core.
  - Core: Fixed CSS specificity for gap properties and required explicit layer parameter for responsive styles.
  - React: Improved Button component's type handling with the asChild prop.
  - Storybook: Added A11y and Docs addons, and upgraded packages.

## 6.2.0

### Minor Changes

- af1dcd9: Exports Alert, Skeleton, Toast and Popover

## 6.1.0

### Minor Changes

- 1ecada6: Added Textarea and NumericInput. Renamed Input to TextInput

## 6.0.1

### Patch Changes

- c829c1a: Focus tweaks

## 6.0.0

### Major Changes

- bfede40: ## Breaking changes to token naming and theme structure

  - **BorderRadius keys have changed:**
    - `small` → `1`
    - `medium` → `2`
    - `large` → `3`
    - `xlarge` → `4`
  - **New token:** `borderRadius: full` has been introduced.
  - **Spacing `0` has been removed from `ThemeTokens`** but is still available via `makeVanillaTheme`.

  ### Migration notes

  - Update any usage of border radius tokens to use the new numeric keys.
  - If you previously used `borderRadius.small`, use `borderRadius[1]`, and so on.
  - If you require spacing `0`, use it via `makeVanillaTheme` instead of `ThemeTokens`.

  Please review your codebase for any direct usage of the old token names and update accordingly.

### Patch Changes

- Updated dependencies [bfede40]
  - @blockle/blocks-core@1.0.0

## 5.0.0

### Minor Changes

- e991dbb: Renamed theming tokens

### Patch Changes

- Updated dependencies [e991dbb]
  - @blockle/blocks-core@0.25.0

## 4.0.0

### Minor Changes

- e6d63b8: Renamed color tokens using color palettes

### Patch Changes

- Updated dependencies [e6d63b8]
  - @blockle/blocks-core@0.24.0

## 3.0.0

### Patch Changes

- Updated dependencies [218f160]
  - @blockle/blocks-core@0.23.0

## 2.0.0

### Minor Changes

- 6888424: ESM only, removed CJS exports / bundling

### Patch Changes

- Updated dependencies [6888424]
  - @blockle/blocks-core@0.22.0

## 1.0.6

### Patch Changes

- 0594680: Added css layers

## 1.0.5

### Patch Changes

- 3bb09cc: Popover and tooltip styling improvements

## 1.0.4

### Patch Changes

- 3307c08: Internal peer deps to major version

## 1.0.3

### Patch Changes

- 6f69819: Replaced sprinkles with custom atoms helper + implementation to enable usage of atoms function outside css.ts files

## 1.0.2

### Patch Changes

- 1790960: Dependency tweaks

## 1.0.1

### Patch Changes

- 1a0719b: Dependency corrections

## 1.0.0

### Minor Changes

- a5a04f5: workspaces refactor

### Patch Changes

- d5ad698: test
- Updated dependencies [d5ad698]
- Updated dependencies [a5a04f5]
  - @blockle/blocks-core@0.21.0
