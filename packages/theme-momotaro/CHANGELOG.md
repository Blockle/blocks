# @blockle/blocks-theme-momotaro

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
