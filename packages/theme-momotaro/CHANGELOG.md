# @blockle/blocks-theme-momotaro

## 7.2.0

### Minor Changes

- 3645e4f: `Button` and `IconButton` accept `intent="inherit"` to take the surrounding text color, such as an `Alert`'s. It needs an explicit `variant="ghost"` or `variant="outline"`; without a variant, or with `solid`, it's a type error. The theme types' button `intent` gains `'inherit'`, so a custom theme's `button` and `iconButton` themes need an `inherit` intent style; the core `Intent` type is unchanged. momotaro draws the text and outline border in `currentColor` and tints the hover background with it.
- 630621f: Add `IconButton`, a square button for a single icon. It requires a `label`, rendered as `aria-label`, and supports the `variant`, `intent` and `size` of `Button` plus a `shape` of `square` (default) or `circle`. Like `Button`, it accepts `disabled`, `loading` (a spinner replaces the icon), `asChild`, `type`, margin atoms and HTML attributes. Themes style it through the new `iconButton` key in `ComponentThemes`; momotaro sizes it to match `Button`'s heights (40, 48 and 56px) and sizes a direct `svg` child per size.
- 8bbc48b: `Link` takes `intent` in place of `variant`, accepting `primary`, `neutral` or `inherit`, the same name `Button` uses for its color. This is a breaking rename with no alias: replace `variant="primary"` and `variant="inherit"` with `intent="primary"` and `intent="inherit"`. `secondary` is gone; use `primary` for a prominent link, or the new `neutral` for a subtle one in metadata, footers or breadcrumbs (momotaro draws it in `neutral.foreground` with weight 500). momotaro still defaults to `primary`. The theme types' link `variant` becomes `intent`, and the `LinkVariant` type is removed, so a custom theme's `link` theme needs `primary`, `neutral` and `inherit` intent styles.
- a960443: Add `Tag`, a compact pill showing a short value, such as a category, a status or a count, colored by any `intent` and sized by `size`. It renders a `span`, supports `asChild`, and takes a `startSlot` and an `endSlot` for an Icon, an `img`, an emoji or an `IconButton`. Slot content is sized to the Tag's line height, so a Tag doesn't grow taller with it, and the padding on a side with a filled Slot is reduced. Removing a Tag is composed, not built in:

  ```tsx
  <Tag
    endSlot={
      <IconButton
        label="Remove label bug"
        variant="ghost"
        size="small"
        shape="circle"
        intent="inherit"
        onClick={onRemove}
      >
        <CloseIcon />
      </IconButton>
    }
  >
    bug
  </Tag>
  ```

  momotaro defaults to the `neutral` intent and the `small` size. A custom theme needs a `tag` theme with `root`, `startSlot` and `endSlot` classes.

## 7.1.0

### Minor Changes

- 2bf6086: `Alert` and `Toast` now use `intent="danger"` for errors, the same name `Button` uses. `intent="error"` is removed: replace it with `intent="danger"` (also in `showToast({ intent })`).

  Blocks core exports the shared `Intent` type (`primary`, `secondary`, `neutral`, `danger`, `success`, `info`, `warning`), matching the Color role groups; every component's `intent` accepts a subset of it. Custom themes that style `alert.variants.intent.error` must rename that key to `danger`.

- 51a1c03: `Drawer` and `Dialog` now close their `<dialog>` while React hides them in an `<Activity>` (as Next.js does for a route you left), and open it as modal again when revealed. Hydrating a server-rendered open `Drawer` or `Dialog` no longer throws `InvalidStateError`. A `ref` passed to either now reaches the `<dialog>` without breaking its own open and close behaviour.

  `Drawer` takes a `size` of `small` (300px, the default), `medium` (480px) or `large` (640px), capped at the viewport. It sets the width for `left` and `right`, and the height for `top` and `bottom` placement. The size lives in the theme's `drawer` component as a `size` variant. `Drawer` also merges a `className` with its own classes, and restores focus to the previously focused element after it closes.

  `ComponentThemes['drawer']` gains a required `size` variant. A custom theme that defines the `drawer` component needs to add `size` variants (`small`, `medium`, `large`) to keep type-checking.

- c3a2419: `ToastProvider` takes a `placement` that now actually places the toasts: a side of the screen (`top` or `bottom`), optionally lined up with its `start` or `end` edge, as in `bottom-end`. It defaults to `bottom`. The type is exported as `ToastPlacement`. For `top` placements the newest toast is nearest the top edge. `position` was ignored before; it now works but is deprecated (`bottom-left` maps to `bottom-start`, `bottom-center` to `bottom`, `bottom-right` to `bottom-end`, and the same for `top-*`), and `placement` wins when both are passed. Toasts no longer catch clicks on the empty space beside them, and showing several toasts at once no longer logs an unhandled `AbortError` from a skipped view transition.

  Toast styling moved into a `toast` component theme, which momotaro now provides: the stack is at most 400px wide, and each toast has a shadow and slides in from the screen edge. Custom themes must define `toast` as `{ root, toast }`, optionally with `placement` variants. Its unused `intent` variant is removed. Without a theme, toasts are still placed correctly, full width and unanimated.

### Patch Changes

- 965d474: `Select` now takes a `size` prop (`small`, `medium` or `large`, default `medium`) like `Button`. In momotaro the sizes are 40, 48 and 56px high with the same inline padding as the matching `Button` size.

  **Breaking:** the native numeric `size` attribute (visible row count) is no longer accepted on `Select`; `size={4}` is now a type error.

  **Visual change:** a `Select` without `size` is now `medium`, 48px high instead of 40px, with wider inline padding. Pass `size="small"` to keep the previous look.

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
