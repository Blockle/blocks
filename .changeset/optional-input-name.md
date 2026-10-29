---
'@blockle/blocks': patch
'@blockle/blocks-react': patch
---

`name` is now optional on `Checkbox`, `Radio` and `TextInput`, as it is on a native `<input>`. A control that sits outside a form, such as a checkbox that saves on change, no longer needs a made-up `name`. Without `name`, the rendered `<input>` has no `name` attribute; with one, it is passed through as before.
