---
'@blockle/blocks': minor
'@blockle/blocks-react': minor
---

**Breaking:** `Alert` no longer draws its own close button: `onRequestClose` and `closeLabel` are removed. It takes a `startSlot`, before the message, and an `endSlot`, after it, which replaces `action`. The message takes the remaining width, and Slot content is centered but not resized or recolored.

To migrate a dismissable Alert, compose the button in `endSlot`, bringing your own × icon:

```tsx
<Alert
  endSlot={
    <IconButton label="Close" variant="ghost" size="small" intent="inherit" onClick={onClose}>
      <CloseIcon />
    </IconButton>
  }
>
  Saved
</Alert>
```

Rename `action` to `endSlot`; put both in `endSlot` when an Alert has an action and a close button. `ToastProvider` still gives each Toast a close button, now an `IconButton`, and takes `closeLabel` (default `'Close'`) for its accessible name.
