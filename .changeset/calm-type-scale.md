---
"@blockle/blocks-core": minor
"@blockle/blocks-react": minor
"@blockle/blocks-theme-momotaro": minor
"@blockle/blocks": minor
---

- Add a `letterSpacing` atom backed by a new `typography.letterSpacing` theme token (`tight`, `normal`, `wide`, `wider`).
- Add a fluid `display` step to `typography.fontSize` and `typography.lineHeight`, available through the `fontSize` and `lineHeight` atoms.
- `Label` uses the `wide` letter spacing token.
- Breaking for custom themes: `typography.letterSpacing`, `typography.fontSize.display` and `typography.lineHeight.display` are now required in `ThemeTokens`.
