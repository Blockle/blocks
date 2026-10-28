# Color schemes resolved with `light-dark()`

Each Color role is declared once on the theme class as `light-dark(light, dark)`. `BlocksProvider` sets only the CSS `color-scheme` property: `light`, `dark`, or `light dark` for `system`. Custom properties that aren't registered are resolved where they are used, so any element whose `color-scheme` changes (a nested provider, a portal wrapper, or a plain element) flips every role beneath it, with no reassigned variables, scheme selectors or media queries. `data-color-scheme` stays only as a debugging and test hook. Roles are the default for components and atoms, but the Palette is also in the contract and in atoms, for deliberate colors that stay the same in both schemes.

## Rules

- Never register a Color role with `@property`. A registered role resolves once, at the theme root, and nested scheme changes then do nothing, with no error.
- `light-dark()` only takes colors. A token that changes per scheme but isn't a color uses `light-dark()` on its color part (as shadows do). If that isn't possible, the token falls back to a `[data-color-scheme]` / media-query override.
- JS that needs a resolved color reads a real property, not the variable.

## Considered Options

- **Reassigning variables per scheme**: rejected. It emits every role three times, and only elements carrying the theme class can switch schemes.
- **Redefining the Palette per scheme**: rejected. Components pick shades for their meaning, and inverting the scale breaks that meaning.
- **`dark:`-style atom variants**: rejected. They double the atom CSS and push scheme logic into every call site.
- **More than two schemes**: out of scope. High contrast would use `prefers-contrast` overrides.
