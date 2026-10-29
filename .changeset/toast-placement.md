---
'@blockle/blocks': minor
'@blockle/blocks-core': minor
'@blockle/blocks-react': minor
'@blockle/blocks-theme-momotaro': minor
---

`ToastProvider` takes a `placement` that now actually places the toasts: a side of the screen (`top` or `bottom`), optionally lined up with its `start` or `end` edge, as in `bottom-end`. It defaults to `bottom`. The type is exported as `ToastPlacement`. For `top` placements the newest toast is nearest the top edge. `position` was ignored before; it now works but is deprecated (`bottom-left` maps to `bottom-start`, `bottom-center` to `bottom`, `bottom-right` to `bottom-end`, and the same for `top-*`), and `placement` wins when both are passed. Toasts no longer catch clicks on the empty space beside them, and showing several toasts at once no longer logs an unhandled `AbortError` from a skipped view transition.

Toast styling moved into a `toast` component theme, which momotaro now provides: the stack is at most 400px wide, and each toast has a shadow and slides in from the screen edge. Custom themes must define `toast` as `{ root, toast }`, optionally with `placement` variants. Its unused `intent` variant is removed. Without a theme, toasts are still placed correctly, full width and unanimated.
