# @blockle/blocks-core

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
