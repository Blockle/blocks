---
"@blockle/blocks-react-slot": minor
"@blockle/blocks": patch
---

**Slot and createSlottable Enhancements**

- Added `noSlot` prop to Template component returned by `createSlottable`, enabling direct prop merging with a single child element when using the `asChild` pattern without requiring a Slot component
- Added comprehensive unit tests for both Slot component and `createSlottable` factory, covering all major behaviors including the new `noSlot` prop and error handling
- Significantly expanded and clarified README documentation with new usage examples, explanation of the `noSlot` prop, and detailed API documentation
- Improved Slot component type safety by allowing `children` to be optional
- Updated Box component to use the new `noSlot` prop pattern for simplified implementation
