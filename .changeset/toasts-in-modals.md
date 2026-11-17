---
'@blockle/blocks-react': patch
'@blockle/blocks': patch
---

Toasts shown while a `Dialog` or `Drawer` is open are no longer covered by it and inert: the toast stack is a manual popover that renders in the topmost open modal, or in the body when none is open, and moves back when the modal closes. Toasts now use `role="status"`, or `role="alert"` for the `danger` intent, and the stack is a polite live region that stays rendered while `ToastProvider` is mounted.
