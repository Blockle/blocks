---
'@blockle/blocks': minor
'@blockle/blocks-core': minor
'@blockle/blocks-react': minor
'@blockle/blocks-theme-momotaro': minor
---

Add `Tag`, a compact pill showing a short value, such as a category, a status or a count, colored by any `intent` and sized by `size`. It renders a `span`, supports `asChild`, and takes a `startSlot` and an `endSlot` for an Icon, an `img`, an emoji or an `IconButton`. Slot content is sized to the Tag's line height, so a Tag doesn't grow taller with it, and the padding on a side with a filled Slot is reduced. Removing a Tag is composed, not built in:

```tsx
<Tag
  endSlot={
    <IconButton label="Remove label bug" variant="ghost" size="small" shape="circle" intent="inherit" onClick={onRemove}>
      <CloseIcon />
    </IconButton>
  }
>
  bug
</Tag>
```

momotaro defaults to the `neutral` intent and the `small` size. A custom theme needs a `tag` theme with `root`, `startSlot` and `endSlot` classes.
