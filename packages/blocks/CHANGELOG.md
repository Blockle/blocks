# @blockle/blocks

## 3.2.0

### Minor Changes

- 739df3c: **Breaking:** `Alert` no longer draws its own close button: `onRequestClose` and `closeLabel` are removed. It takes a `startSlot`, before the message, and an `endSlot`, after it, which replaces `action`. The message takes the remaining width, and Slot content is centered but not resized or recolored.

  To migrate a dismissable Alert, compose the button in `endSlot`, bringing your own × icon:

  ```tsx
  <Alert
    endSlot={
      <IconButton
        label="Close"
        variant="ghost"
        size="small"
        intent="inherit"
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    }
  >
    Saved
  </Alert>
  ```

  Rename `action` to `endSlot`; put both in `endSlot` when an Alert has an action and a close button. `ToastProvider` still gives each Toast a close button, now an `IconButton`, and takes `closeLabel` (default `'Close'`) for its accessible name.

- ad55f76: `Alert` takes `role="status"` for a lasting notice that should not be announced as urgent; it still defaults to `role="alert"`.
- 3645e4f: `Button` and `IconButton` accept `intent="inherit"` to take the surrounding text color, such as an `Alert`'s. It needs an explicit `variant="ghost"` or `variant="outline"`; without a variant, or with `solid`, it's a type error. The theme types' button `intent` gains `'inherit'`, so a custom theme's `button` and `iconButton` themes need an `inherit` intent style; the core `Intent` type is unchanged. momotaro draws the text and outline border in `currentColor` and tints the hover background with it.
- 35faeed: The `cursor` atom takes `grab`, `grabbing`, `text` and `not-allowed`, alongside `auto` and `pointer`, so `Box` and `atoms()` can show a drag or text cursor without custom CSS.
- 630621f: Add `IconButton`, a square button for a single icon. It requires a `label`, rendered as `aria-label`, and supports the `variant`, `intent` and `size` of `Button` plus a `shape` of `square` (default) or `circle`. Like `Button`, it accepts `disabled`, `loading` (a spinner replaces the icon), `asChild`, `type`, margin atoms and HTML attributes. Themes style it through the new `iconButton` key in `ComponentThemes`; momotaro sizes it to match `Button`'s heights (40, 48 and 56px) and sizes a direct `svg` child per size.
- 8bbc48b: `Link` takes `intent` in place of `variant`, accepting `primary`, `neutral` or `inherit`, the same name `Button` uses for its color. This is a breaking rename with no alias: replace `variant="primary"` and `variant="inherit"` with `intent="primary"` and `intent="inherit"`. `secondary` is gone; use `primary` for a prominent link, or the new `neutral` for a subtle one in metadata, footers or breadcrumbs (momotaro draws it in `neutral.foreground` with weight 500). momotaro still defaults to `primary`. The theme types' link `variant` becomes `intent`, and the `LinkVariant` type is removed, so a custom theme's `link` theme needs `primary`, `neutral` and `inherit` intent styles.
- 4847164: Add a `listStyle` atom (`none`) to drop list markers, for example `<Stack asChild gap={2} listStyle="none"><ul>…</ul></Stack>`; a `className` setting `list-style` still overrides it. Pass `role="list"` when list semantics matter, as WebKit drops them for unstyled lists. `Inline` now accepts `role`.
- 6bf7bba: Alignment uses logical `start` and `end` keys instead of `left` and `right`, so it follows the writing direction and reads the same on both axes.

  - `Inline` `alignX` and `alignY`, and `Stack` `alignX`, take `start | end | center` (plus `between | around` for `justify-content` and `stretch` for `align-items`). Replace `left` with `start` and `right` with `end`. For example, `<Inline alignY="left">`, which aligned items to the top, becomes `<Inline alignY="start">`.
  - `justifyContentMap` and `alignItemsMap` from `@blockle/blocks-core` have `start` and `end` keys instead of `left` and `right`.
  - The `textAlign` atom takes `start | end | center | justify` and renders `text-align: start` or `end`. Replace `textAlign="left"` with `"start"` and `"right"` with `"end"`.
  - `Stack` takes `alignY` (`start | end | center | between | around`), which sets `justify-content` along the column, for example `<Stack gap={2} alignY="between">`.

- c7bf2ac: Remove `startSlot` and `endSlot` from `NumericInput`. The step buttons are `NumericInput`'s own, so these props used to silently replace them; passing either is now a type error.

  A consumer `onKeyDown` no longer turns off Shift+↑/↓ stepping by 10: both handlers run, yours first. Call `event.preventDefault()` in yours to skip the stepping for that key press.

- cd96cce: `NumericInput`'s step buttons are now `IconButton`s with an accessible name. They're named "Decrease" and "Increase" by default; pass `decrementLabel` and `incrementLabel` to translate them.
- 1d5bb21: Remove `tag` from `Stack` and `Inline`, and `start` from `Stack`. They render a `div`; choose another element with `asChild`. Lists no longer drop their markers automatically, so pass `listStyle="none"` (and `role="list"` when list semantics matter).

  ```tsx
  // Before
  <Stack tag="ul" gap={2}>…</Stack>
  <Inline tag="nav" gap={2}>…</Inline>
  <Stack tag="ol" start={3} gap={2}>…</Stack>

  // After
  <Stack asChild gap={2} listStyle="none"><ul>…</ul></Stack>
  <Inline asChild gap={2}><nav>…</nav></Inline>
  <Stack asChild gap={2} listStyle="none"><ol start={3}>…</ol></Stack>
  ```

- 34b09c0: `Stack` and `Inline` now accept the HTML attributes of their element (`id`, `aria-*`, `data-*`, `role`, event handlers such as `onClick`), a `ref` typed `React.Ref<HTMLElement>`, and `asChild`. With `asChild`, the single child element is rendered with the layout classes merged onto it.
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

- a336721: `Text` and `Heading` take `lineClamp` (1 to 5), which caps the text at that many lines and ends it in an ellipsis, and `truncate`, which keeps the text on one line and ends the overflow in an ellipsis. `truncate` makes the element block-level, so it works on the default `span`. With both set, `lineClamp` applies and a development warning is logged. The atoms add `minInlineSize: 0`, which lets a flex item such as an `Inline` shrink below its content.
- eef6a4e: `Textarea` takes a `fill` prop that stretches its container to the parent's block size and makes the `<textarea>` at least as tall as the container. With `grow`, textareas side by side, such as in a `Grid`, keep equal heights without custom CSS, up to the container's maximum block size; raise `maxBlockSize` to lift that limit.
- 77d8066: Toast Auto-dismiss now pauses while any toast is hovered or focused, or the page is hidden, and then continues with the time left. A toast added while paused starts its countdown once the stack resumes. Window blur alone doesn't pause.

  Showing a toast again with the same `id` now replaces its countdown: it runs the new `duration`, or stays until closed when there is none. Before, the first timer kept running and removed the updated toast. Closing a toast or unmounting `ToastProvider` now clears its pending timer.

  Leave out `duration` for a toast that contains an action, such as an "Undo" button.

### Patch Changes

- b25fe83: Checkbox, Select, NumericInput and Toast now draw their built-in icons from one shared internal set, so their strokes stay consistent. The Checkbox check and Select chevron are now `aria-hidden` instead of `role="presentation"`. Rendering is unchanged.

## 3.1.0

### Minor Changes

- 1281b20: `Alert`'s close button now has an accessible name, so screen readers announce it as "Close" instead of just "button". This includes the close button on every toast. Pass `closeLabel` to use your own wording, for example `closeLabel="Sluiten"`.
- 2bf6086: `Alert` and `Toast` now use `intent="danger"` for errors, the same name `Button` uses. `intent="error"` is removed: replace it with `intent="danger"` (also in `showToast({ intent })`).

  Blocks core exports the shared `Intent` type (`primary`, `secondary`, `neutral`, `danger`, `success`, `info`, `warning`), matching the Color role groups; every component's `intent` accepts a subset of it. Custom themes that style `alert.variants.intent.error` must rename that key to `danger`.

- 51a1c03: `Drawer` and `Dialog` now close their `<dialog>` while React hides them in an `<Activity>` (as Next.js does for a route you left), and open it as modal again when revealed. Hydrating a server-rendered open `Drawer` or `Dialog` no longer throws `InvalidStateError`. A `ref` passed to either now reaches the `<dialog>` without breaking its own open and close behaviour.

  `Drawer` takes a `size` of `small` (300px, the default), `medium` (480px) or `large` (640px), capped at the viewport. It sets the width for `left` and `right`, and the height for `top` and `bottom` placement. The size lives in the theme's `drawer` component as a `size` variant. `Drawer` also merges a `className` with its own classes, and restores focus to the previously focused element after it closes.

  `ComponentThemes['drawer']` gains a required `size` variant. A custom theme that defines the `drawer` component needs to add `size` variants (`small`, `medium`, `large`) to keep type-checking.

- 44a2ccc: `Dialog`, `Drawer` and `Popover` pass a reason to `onRequestClose`: `'escape'` or `'outside-click'`, typed as the new exported `RequestCloseReason`. Callbacks that take no argument still type-check.

  `Dialog` and `Drawer` handle Escape on their own `<dialog>` instead of on `document`, so content can claim an Escape with `stopPropagation()` or `preventDefault()` and keep the overlay open, also when React's root is `document`. A close request that is not a key press, such as the Android back gesture, calls `onRequestClose('escape')` instead of closing the dialog natively. `Popover` still listens on `document`, but skips an Escape that is already `defaultPrevented`, and prevents the Escapes it handles.

  `Drawer` now takes part in nesting as `Dialog` does: while a `Dialog` or `Drawer` opened inside it is open, it ignores Escape and clicks outside, so one Escape closes only the inner one.

- 01fa519: `Popover` and `Tooltip` take a `placement`: a side (`top`, `bottom`, `left`, `right`), optionally lined up with the anchor's `start` or `end` edge, as in `bottom-start`. A bare side centres the popover on the anchor, as before. The type is exported as `PopoverPlacement`. `position` still works but is deprecated; `placement` wins when both are passed.

  The popover now stays inside the viewport: it shifts along the anchor's side to keep at least 8px from the viewport's edges, and a popover bigger than the viewport starts 8px from its start edge. Flipping to the other side keeps the edge, so `top-start` without room above becomes `bottom-start`, and only flips when the other side has more room.

- 62d5b9f: `Switch` now has `role="switch"`, so assistive technology and `getByRole('switch', { name })` see a switch instead of a checkbox. Its checked state comes from the native `checked`.

  `Switch`'s `onChange` is now the native input change handler (`React.ChangeEventHandler<HTMLInputElement>`), like the other form controls. Clicking the track, clicking an associated label and pressing Space each call it exactly once, also under `React.StrictMode`. A controlled `Switch` (`checked` + `onChange`) now only changes when its `checked` prop does.

  **Migration:** read the new value from the event:

  ```diff
  - <Switch checked={show} onChange={setShow} />
  + <Switch checked={show} onChange={(event) => setShow(event.target.checked)} />
  ```

  Tests that queried the `checkbox` role should query `switch` instead.

- c3a2419: `ToastProvider` takes a `placement` that now actually places the toasts: a side of the screen (`top` or `bottom`), optionally lined up with its `start` or `end` edge, as in `bottom-end`. It defaults to `bottom`. The type is exported as `ToastPlacement`. For `top` placements the newest toast is nearest the top edge. `position` was ignored before; it now works but is deprecated (`bottom-left` maps to `bottom-start`, `bottom-center` to `bottom`, `bottom-right` to `bottom-end`, and the same for `top-*`), and `placement` wins when both are passed. Toasts no longer catch clicks on the empty space beside them, and showing several toasts at once no longer logs an unhandled `AbortError` from a skipped view transition.

  Toast styling moved into a `toast` component theme, which momotaro now provides: the stack is at most 400px wide, and each toast has a shadow and slides in from the screen edge. Custom themes must define `toast` as `{ root, toast }`, optionally with `placement` variants. Its unused `intent` variant is removed. Without a theme, toasts are still placed correctly, full width and unanimated.

### Patch Changes

- 0436909: `@blockle/blocks` now requires `@blockle/blocks-react` `>=3.0.1` as a peer dependency. A project that still has `blocks-react` 3.0.0 installed, which crashes in Server Components, gets it upgraded (or a peer conflict reported) when it installs `@blockle/blocks`, instead of keeping the broken version.
- 51fe64c: `Dialog`, `Drawer` and `Popover` now close on an outside click only when the press both starts and ends outside them. A click whose own handler removes its target, or a text selection dragged out of the overlay, no longer closes it.
- c504729: The README documents how to test `Dialog` and `Drawer` in jsdom: a polyfill for `showModal()`, `show()` and `close()` to add to your test setup, so an open dialog can be found by role. Under the polyfill the dialog is not modal, so modal behaviour still needs browser tests.
- 89b66a2: `Checkbox`, `Radio` and `Switch` no longer shrink in a flex row beside text that wraps. Their root now sets `flex-shrink: 0`, so consumers can drop `flexShrink: 0` workarounds passed through `className`.
- c16decd: `name` is now optional on `Checkbox`, `Radio` and `TextInput`, as it is on a native `<input>`. A control that sits outside a form, such as a checkbox that saves on change, no longer needs a made-up `name`. Without `name`, the rendered `<input>` has no `name` attribute; with one, it is passed through as before.
- 9092dde: `Popover` no longer throws when it closes where the Popover API is missing, such as in jsdom: it warns instead, as it already did when opening. The README documents how to test `Popover` in jsdom with a polyfill for `showPopover()`, `hidePopover()` and `togglePopover()` and a test stylesheet, so an open popover's content can be found by role.
- 4652ba3: `Popover` keeps working when you pass it a `ref`. The passed `ref` used to replace `Popover`'s own, so the popover was never shown or positioned and ignored clicks outside. Now both refs receive the element.
- 965d474: `Select` now takes a `size` prop (`small`, `medium` or `large`, default `medium`) like `Button`. In momotaro the sizes are 40, 48 and 56px high with the same inline padding as the matching `Button` size.

  **Breaking:** the native numeric `size` attribute (visible row count) is no longer accepted on `Select`; `size={4}` is now a type error.

  **Visual change:** a `Select` without `size` is now `medium`, 48px high instead of 40px, with wider inline padding. Pass `size="small"` to keep the previous look.

## 3.0.1

### Patch Changes

- 55f8d3b: Add the `'use client'` directive to every module that calls or defines a hook or creates a context. Importing from `@blockle/blocks-react` in a Server Component no longer evaluates `ToastContext` on the server, and `Drawer`, `NumericInput`, `Heading`, `Text`, and `IconMask` are now client components.

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

- c7efbac: Adds the `useColorMode()` hook, which returns `{ colorMode, resolvedColorMode }`. `colorMode` is what the outermost `BlocksProvider` was given (`light`, `dark` or `system`); `resolvedColorMode` is always `light` or `dark` and, under `system`, follows `prefers-color-scheme` and updates when the OS preference changes. It is safe during server rendering (it returns `light` until the client takes over).

### Patch Changes

- b5a3008: Breaking for custom themes: `typography.lineHeight` keys are now `compact`, `snug`, `normal` and `relaxed` (unitless ratios), replacing `xsmall` to `display`.

## 2.4.1

### Patch Changes

- 743d435: Align `@blockle/blocks-core` peer dependency ranges with the current major, and declare the Momotaro theme as an optional peer of `@blockle/blocks`.

## 2.4.0

### Minor Changes

- 75aa633: - Add a `letterSpacing` atom backed by a new `typography.letterSpacing` theme token (`tight`, `normal`, `wide`, `wider`).
  - Add a fluid `display` step to `typography.fontSize` and `typography.lineHeight`, available through the `fontSize` and `lineHeight` atoms.
  - `Label` uses the `wide` letter spacing token.
  - Breaking for custom themes: `typography.letterSpacing`, `typography.fontSize.display` and `typography.lineHeight.display` are now required in `ThemeTokens`.

## 2.3.28

### Patch Changes

- c053f75: - `Grid` accepts the same atoms as `Stack` and `Inline` (except `flexDirection`), and `display` can be overridden.
  - `Grid` merges a custom `className` with its own styles instead of replacing them.
  - `Grid` default columns use `minmax(0, 1fr)` so long content no longer widens tracks.
  - `Textarea` `containerProps` accepts atoms.
  - `Textarea` replaces `maxHeight` with `maxBlockSize` (same behaviour). Rename `maxHeight` to `maxBlockSize`.

## 2.3.27

### Patch Changes

- 58e24da: Fix: merge the Textarea's custom `className` with its built-in and theme styles.

## 2.3.26

### Patch Changes

- 3f79fc3: Fix: update Alert component to conditionally render close button and enhance Textarea component with maxHeight and containerProps support

## 2.3.25

### Patch Changes

- 8e9f47e: Fix: update sideEffects configuration in package.json files

## 2.3.24

### Patch Changes

- 1b33b09: Fix sideEffects configuration in package.json for core and reset packages

## 2.3.23

### Patch Changes

- 95a89e5: Expose Grid and GridItem

## 2.3.22

### Patch Changes

- 7f660d5: fix getComponentStyles when using defaults

## 2.3.21

### Patch Changes

- 51589bb: Using "appearance: none" instead of "all: unset"

## 2.3.20

### Patch Changes

- 269d397: Allow most html attributes for base components
- 02b716a: Refactor layer definitions to remove parent-child relationships

## 2.3.19

### Patch Changes

- 6b5d527: Remove 'all: unset' from buttonReset style
- 5c710a7: Center dialog

## 2.3.18

### Patch Changes

- 766d998: Remove 'all: unset' from buttonReset style

## 2.3.17

### Patch Changes

- 3bd1c36: Introducing grow for TextArea and css reset improvements

## 2.3.16

### Patch Changes

- c879057: <Flex />

## 2.3.15

### Patch Changes

- 3cfe06f: IconMask display fix

## 2.3.14

### Patch Changes

- 92f24d5: IconMask css display can now be set

## 2.3.13

### Patch Changes

- 7f10490: Allow more atoms to be passed to "IconMask" component.

## 2.3.12

### Patch Changes

- 4d39467: Button update type handling for asChild prop

## 2.3.11

### Patch Changes

- b9c393d: Refactored the useComponentStyles hook to delegate all style computation logic to the new getComponentStyles utility, removing the duplicate implementation and simplifying the hook code.

## 2.3.10

### Patch Changes

- 9df99ee: Divider added size variants, children and alignment

## 2.3.9

### Patch Changes

- 4c08c52: - Added `noSlot` prop to Template component returned by `createSlottable`, enabling direct prop merging with a single child element when using the `asChild` pattern without requiring a Slot component
  - Improved Slot component type safety by allowing `children` to be optional
  - Updated Box component to use the new `noSlot` prop pattern for simplified implementation

## 2.3.8

### Patch Changes

- f7a6061: CSS specificity improvements

## 2.3.7

### Patch Changes

- 6129679: Peer dependency correction

## 2.3.6

### Patch Changes

- 3628152: Publish test

## 2.3.5

### Patch Changes

- ccb1694: Test release

## 2.3.4

### Patch Changes

- 8c094b8: Drawer prototype

## 2.3.3

### Patch Changes

- 03182b7: Renamed base → root across all component themes for consistency
  Updated typography tokens: primary → heading, secondary → mono
  Converted shadow values from semantic (small, medium, large) to numeric scale (1-5)
  Enhanced button variants: added secondary and success options

## 2.3.2

### Patch Changes

- 962d6f3: - Accessibility: Updated Momotaro theme neutral buttons for WCAG AA contrast compliance.
  - Breaking Change: Renamed rem() to pixelsToRem() in @blockle/blocks-core.
  - Core: Fixed CSS specificity for gap properties and required explicit layer parameter for responsive styles.
  - React: Improved Button component's type handling with the asChild prop.
  - Storybook: Added A11y and Docs addons, and upgraded packages.

## 2.3.1

### Patch Changes

- 88f83bd: CSS Grid with responsive span props

## 2.3.0

### Minor Changes

- b233f03: Replaced the <Toast> component with a useToast() hook for more ergonomic toast management
  Updated Toast to render as Alert components with proper intent support
  Fixed CSS box-sizing property placement to be outside the @layer directive
  Corrected SVG attributes in Alert from hyphenated to camelCase format

## 2.2.1

### Patch Changes

- 230cfcb: Fixed ToastProvider when using ssr

## 2.2.0

### Minor Changes

- af1dcd9: Exports Alert, Skeleton, Toast and Popover

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
