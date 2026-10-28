---
'@blockle/blocks': minor
'@blockle/blocks-core': minor
'@blockle/blocks-react': minor
'@blockle/blocks-theme-momotaro': minor
---

`Drawer` and `Dialog` now close their `<dialog>` while React hides them in an `<Activity>` (as Next.js does for a route you left), and open it as modal again when revealed. Hydrating a server-rendered open `Drawer` or `Dialog` no longer throws `InvalidStateError`. A `ref` passed to either now reaches the `<dialog>` without breaking its own open and close behaviour.

`Drawer` takes a `size` of `small` (300px, the default), `medium` (480px) or `large` (640px), capped at the viewport. It sets the width for `left` and `right`, and the height for `top` and `bottom` placement. The size lives in the theme's `drawer` component as a `size` variant. `Drawer` also merges a `className` with its own classes, and restores focus to the previously focused element after it closes.
