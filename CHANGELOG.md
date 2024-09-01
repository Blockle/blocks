# @blockle/blocks

## 0.13.0

### Minor Changes

- 22fe39d: Introducing createAsChildTemplate that replaced Slottable

## 0.12.2

### Patch Changes

- 82c24ac: Changed width to inlineSize in Divider

## 0.12.1

### Patch Changes

- 9ce2962: Using the intended js api to open and close the dialog

## 0.12.0

### Minor Changes

- f141de5: Renamed Dropdown to Popover
  Removed variants from Popover.
  Can now apply custom styling for Tooltip.

## 0.11.3

### Patch Changes

- feadbfd: Dependency fix

## 0.11.2

### Patch Changes

- 5ef1b33: Moved dependencies to devDependencies

## 0.11.1

### Patch Changes

- 5a20ca2: Fixed build

## 0.11.0

### Minor Changes

- 1d2937b: Added Tooltip

## 0.10.0

### Minor Changes

- a6040bd: Added Slider component

## 0.9.1

### Patch Changes

- 2a01e1f: Dialog accessibility improvements

## 0.9.0

### Minor Changes

- 9992144: Removed "legacy" CSS properties and converted them to CSS logical properties

### Patch Changes

- 7c9d2c6: Added Select component
- 6b23230: - Added checkbox icon.
  - Transition improvements.

## 0.8.10

### Patch Changes

- c8b7d4e: Renamed prop `gap` to `spacing` for Inline

## 0.8.9

### Patch Changes

- fcb6830: - Renamed prop `gap` to `spacing` in Stack
  - Renamed prop `visualOnly` to `asSpan` in Label
  - Removed Stack from RadioGroup for more flexibility how to render child elements

## 0.8.8

### Patch Changes

- 58aa4ce: Added z-index: 1000 to dialog

## 0.8.7

### Patch Changes

- 4d0c563: Switch component
- 8577699: Momotaro button styling improvements

## 0.8.6

### Patch Changes

- 37beeb9: Removed "align" prop in Heading. Use "textAlign" instead
- 29ba4c0: Custom style api, combines atoms and raw css in a single object with the same api as style. So it could be used as a drop-in replacement for vanilla-extract style function.

## 0.8.5

### Patch Changes

- 7eb0416: It's now optional to provide custom component styles

## 0.8.4

### Patch Changes

- 72cae4e: Fixed issue in useRestoreFocus hook that always focussed the first element the user interacted with

## 0.8.3

### Patch Changes

- a053c70: Dialog support for "prefers-reduced-motion"

## 0.8.2

### Patch Changes

- 0d526a3: fix: Moved @changesets/cli to dev dependencies

## 0.8.1

### Patch Changes

- 3f0a4f0: Fixed usePreventBodyScroll for nested dialogs and show a scrollbar when there scrollbar is already visible
- 13b962b: Heading and Text atoms alignment

## 0.8.0

### Minor Changes

- a6c5730: Breaking change: removed polymorphic component renderer and replaced with asChild (inspired by radix ui)

## 0.7.2

### Patch Changes

- 14eafa0: Using react namespace for types

## 0.7.1

### Patch Changes

- 5df368b: Named exports

## 0.7.0

### Minor Changes

- ce1dbaa: Added Label, Checkbox and Radio.

## 0.6.0

### Minor Changes

- 6ced546: Theming refactor (breaking)

## 0.5.1

### Patch Changes

- 5012822: Added alignContent and alignSelf to sprinkles config

## 0.5.0

### Minor Changes

- 9d3f158: makeComponentTheme api changed from `makeComponentTheme({ type: 'button' })` to `makeComponentTheme('button', {})`

## 0.4.1

### Patch Changes

- cdc99bd: Variant prop of Link component is now optional

## 0.4.0

### Minor Changes

- 5c48647: Added Dialog

## 0.3.9

### Patch Changes

- 53143ad: Test release 2

## 0.3.8

### Patch Changes

- d8e5a55: Testing release

## 0.3.7

### Patch Changes

- fe015b0: Test release
