---
"@blockle/blocks-theme-momotaro": major
"@blockle/blocks-react": major
"@blockle/blocks-core": major
"@blockle/blocks": major
---

## Breaking changes to token naming and theme structure

- **BorderRadius keys have changed:**  
  - `small` → `1`  
  - `medium` → `2`  
  - `large` → `3`  
  - `xlarge` → `4`
- **New token:** `borderRadius: full` has been introduced.
- **Spacing `0` has been removed from `ThemeTokens`** but is still available via `makeVanillaTheme`.

### Migration notes

- Update any usage of border radius tokens to use the new numeric keys.
- If you previously used `borderRadius.small`, use `borderRadius[1]`, and so on.
- If you require spacing `0`, use it via `makeVanillaTheme` instead of `ThemeTokens`.

Please review your codebase for any direct usage of the old token names and update accordingly.
