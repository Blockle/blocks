---
"@blockle/blocks-theme-momotaro": patch
"@blockle/blocks-react": patch
"@blockle/blocks-core": patch
"@blockle/blocks": patch
---

- Accessibility: Updated Momotaro theme neutral buttons for WCAG AA contrast compliance.
- Breaking Change: Renamed rem() to pixelsToRem() in @blockle/blocks-core.
- Core: Fixed CSS specificity for gap properties and required explicit layer parameter for responsive styles.
- React: Improved Button component's type handling with the asChild prop.
- Storybook: Added A11y and Docs addons, and upgraded packages.
