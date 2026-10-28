# @blockle/blocks-core

## 3.0.0

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

- c7efbac: The `color`, `backgroundColor` and `borderColor` atoms accept a Mode value: a Palette shade for every Color mode, such as `color={{ light: 'neutral-900', dark: 'neutral-100' }}`. Each value compiles to one prebuilt class per mode, scoped to `data-color-mode` and to the `system` media query, so no inline styles are added. A plain string still means the same in every mode. `defineProperties` takes a `modeProperties` option to opt more properties in.
- b5a3008: Breaking for custom themes: `typography.lineHeight` keys are now `compact`, `snug`, `normal` and `relaxed` (unitless ratios), replacing `xsmall` to `display`.

## 2.0.0

### Major Changes

- 75aa633: - Add a `letterSpacing` atom backed by a new `typography.letterSpacing` theme token (`tight`, `normal`, `wide`, `wider`).
  - Add a fluid `display` step to `typography.fontSize` and `typography.lineHeight`, available through the `fontSize` and `lineHeight` atoms.
  - `Label` uses the `wide` letter spacing token.
  - Breaking for custom themes: `typography.letterSpacing`, `typography.fontSize.display` and `typography.lineHeight.display` are now required in `ThemeTokens`.

## 1.4.0

### Minor Changes

- 60a2ad1: Widen layout and typography props.

  - `Text`: added `code`, `kbd`, `mark`, `q` and `cite` to the supported `tag` values, so `Box asChild` is no longer needed to render them.
  - `Stack` and `Inline`: now accept all `Box` atoms except `flexDirection` and `gap`, which is still required. This enables props like `backgroundColor` and `alignItems="baseline"`.
  - `core`: added `baseline` to the `alignItems` and `alignSelf` atoms.

## 1.3.2

### Patch Changes

- 7f660d5: fix getComponentStyles when using defaults

## 1.3.1

### Patch Changes

- 269d397: Allow most html attributes for base components
- 02b716a: Refactor layer definitions to remove parent-child relationships

## 1.3.0

### Minor Changes

- b9c393d: Refactored the useComponentStyles hook to delegate all style computation logic to the new getComponentStyles utility, removing the duplicate implementation and simplifying the hook code.

## 1.2.6

### Patch Changes

- 9df99ee: Divider added size variants, children and alignment

## 1.2.5

### Patch Changes

- f7a6061: CSS specificity improvements

## 1.2.4

### Patch Changes

- ccb1694: Test release

## 1.2.3

### Patch Changes

- 8c094b8: Drawer prototype

## 1.2.2

### Patch Changes

- 03182b7: Renamed base → root across all component themes for consistency
  Updated typography tokens: primary → heading, secondary → mono
  Converted shadow values from semantic (small, medium, large) to numeric scale (1-5)
  Enhanced button variants: added secondary and success options

## 1.2.1

### Patch Changes

- 962d6f3: - Accessibility: Updated Momotaro theme neutral buttons for WCAG AA contrast compliance.
  - Breaking Change: Renamed rem() to pixelsToRem() in @blockle/blocks-core.
  - Core: Fixed CSS specificity for gap properties and required explicit layer parameter for responsive styles.
  - React: Improved Button component's type handling with the asChild prop.
  - Storybook: Added A11y and Docs addons, and upgraded packages.

## 1.2.0

### Minor Changes

- 88f83bd: CSS Grid with responsive span props

## 1.1.0

### Minor Changes

- 1ecada6: Added Textarea and NumericInput. Renamed Input to TextInput

## 1.0.1

### Patch Changes

- 3e8926c: git gu

## 1.0.0

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

## 0.25.0

### Minor Changes

- e991dbb: Renamed theming tokens

## 0.24.0

### Minor Changes

- e6d63b8: Renamed color tokens using color palettes

## 0.23.0

### Minor Changes

- 218f160: Renamed getBoundValue to clampAndRoundValue and removed roundToPrecision function.
  Removed precision prop from Slider and replaced it with step prop.

## 0.22.0

### Minor Changes

- 6888424: ESM only, removed CJS exports / bundling

## 0.21.12

### Patch Changes

- 4c16505: Re-ordered css layers

## 0.21.11

### Patch Changes

- 0594680: Added css layers

## 0.21.10

### Patch Changes

- 268e57c: Atoms styles now exist on @layer

## 0.21.9

### Patch Changes

- 777e1ab: - Improves CSS matrix transform parsing
  - Improves atoms type safety and error handling

## 0.21.8

### Patch Changes

- 6c05709: Popover improvements

## 0.21.7

### Patch Changes

- 658404d: Side effect tweaks, defineProperties cleanup

## 0.21.6

### Patch Changes

- 4a55770: Fixed return value

## 0.21.5

### Patch Changes

- 3307c08: Internal peer deps to major version

## 0.21.4

### Patch Changes

- 6f69819: Replaced sprinkles with custom atoms helper + implementation to enable usage of atoms function outside css.ts files

## 0.21.3

### Patch Changes

- 1790960: Dependency tweaks

## 0.21.2

### Patch Changes

- 1a0719b: Dependency corrections

## 0.21.1

### Patch Changes

- ed91949: peer dependency correction

## 0.21.0

### Minor Changes

- a5a04f5: workspaces refactor

### Patch Changes

- d5ad698: test
