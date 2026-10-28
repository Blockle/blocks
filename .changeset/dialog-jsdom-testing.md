---
'@blockle/blocks': patch
'@blockle/blocks-react': patch
---

The README documents how to test `Dialog` and `Drawer` in jsdom: a polyfill for `showModal()`, `show()` and `close()` to add to your test setup, so an open dialog can be found by role. Under the polyfill the dialog is not modal, so modal behaviour still needs browser tests.
