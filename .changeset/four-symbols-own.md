---
"@blockle/blocks-react-slot": minor
"@blockle/blocks-react": minor
"@blockle/blocks": patch
---

- Added `noSlot` prop to Template component returned by `createSlottable`, enabling direct prop merging with a single child element when using the `asChild` pattern without requiring a Slot component
- Improved Slot component type safety by allowing `children` to be optional
- Updated Box component to use the new `noSlot` prop pattern for simplified implementation
