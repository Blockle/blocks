---
'@blockle/blocks': minor
'@blockle/blocks-react': minor
---

`Dialog`, `Drawer` and `Popover` pass a reason to `onRequestClose`: `'escape'` or `'outside-click'`, typed as the new exported `RequestCloseReason`. Callbacks that take no argument still type-check.

`Dialog` and `Drawer` handle Escape on their own `<dialog>` instead of on `document`, so content can claim an Escape with `stopPropagation()` or `preventDefault()` and keep the overlay open, also when React's root is `document`. A close request that is not a key press, such as the Android back gesture, calls `onRequestClose('escape')` instead of closing the dialog natively. `Popover` still listens on `document`, but skips an Escape that is already `defaultPrevented`, and prevents the Escapes it handles.

`Drawer` now takes part in nesting as `Dialog` does: while a `Dialog` or `Drawer` opened inside it is open, it ignores Escape and clicks outside, so one Escape closes only the inner one.
