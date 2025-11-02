# @blockle/blocks

## 2.1.0

### Minor Changes

- 1ecada6: Added Textarea and NumericInput. Renamed Input to TextInput

## 2.0.1

### Patch Changes

- c829c1a: Focus tweaks

## 2.0.0

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

## 1.4.0

### Minor Changes

- e991dbb: Renamed theming tokens

## 1.3.0

### Minor Changes

- e6d63b8: Renamed color tokens using color palettes

## 1.2.0

### Minor Changes

- 218f160: Renamed getBoundValue to clampAndRoundValue and removed roundToPrecision function.
  Removed precision prop from Slider and replaced it with step prop.

## 1.1.0

### Minor Changes

- 6888424: ESM only, removed CJS exports / bundling

## 1.0.11

### Patch Changes

- 4c16505: Re-ordered css layers

## 1.0.10

### Patch Changes

- 268e57c: Atoms styles now exist on @layer

## 1.0.9

### Patch Changes

- 94f158e: Improved css reset for popover

## 1.0.8

### Patch Changes

- 3bb09cc: Popover and tooltip styling improvements

## 1.0.7

### Patch Changes

- 777e1ab: - Improves CSS matrix transform parsing
  - Improves atoms type safety and error handling

## 1.0.6

### Patch Changes

- fb63926: Corrected sideEffect (crossed fingers)

## 1.0.5

### Patch Changes

- 658404d: Side effect tweaks, defineProperties cleanup

## 1.0.4

### Patch Changes

- 3307c08: Internal peer deps to major version

## 1.0.3

### Patch Changes

- 6f69819: Replaced sprinkles with custom atoms helper + implementation to enable usage of atoms function outside css.ts files

## 1.0.2

### Patch Changes

- 1a0719b: Dependency corrections

## 1.0.1

### Patch Changes

- ed91949: peer dependency correction

## 1.0.0

### Minor Changes

- a5a04f5: workspaces refactor

### Patch Changes

- d5ad698: test
- Updated dependencies [d5ad698]
- Updated dependencies [a5a04f5]
  - @blockle/blocks-core@0.21.0
  - @blockle/blocks-react@1.0.0
  - @blockle/blocks-reset@0.21.0
  - @blockle/blocks-react-slot@1.0.0
