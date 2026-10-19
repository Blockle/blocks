# Color roles switched by CSS variables for light/dark

Light/dark support is built on Color roles: purpose-named tokens such as `surface`, `text` and `primaryHover`, each with a value per Color scheme. The theme reassigns only the role variables (plus shadows, overlay and focus ring) when the scheme changes. `system` is decided by a `prefers-color-scheme` media query and `light`/`dark` are forced with a data attribute, so it works with server rendering and has no flash. Atoms accept only roles, not Palette shades, because a shade that looks right in light mode can look wrong in dark.

## Considered Options

- **Inverting or redefining the Palette per scheme**: rejected. Components pick shades for their meaning (`primary-700` for "darker on hover", `white` for text on a solid fill). Inverting the scale breaks those meanings.
- **`dark:`-style atom variants**: rejected. They double the atom CSS and push scheme logic into every call site, when switching variable values already covers it.
- **Optional dark values per theme**: rejected. A `colorScheme="dark"` that silently does nothing for some themes is worse than requiring every theme to provide both schemes.
