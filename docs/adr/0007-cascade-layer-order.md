# Theme styles sit in a cascade layer below Atoms, and app styles win over all of Blocks

Blocks orders its cascade layers, lowest priority first, as `blockle-reset` < `blockle-molecule` (component base styles) < `blockle-theme` (Component themes) < `blockle-atom` (Atoms) < `blockle-organism` (unused), with an app's unlayered styles above all of them. The rule: defaults < theme < props < your own CSS. Theme styles used to be unlayered (T616). An app's `className` then tied with them on specificity, and whichever stylesheet loaded last won, while Atoms passed as props always lost to the theme (T301).

## Considered Options

- **Theme layer last, above Atoms**: rejected. It fixes `className`, but Atom props keep losing to the theme, so their types promise overrides they can't deliver.
- **Leave themes unlayered and document a specificity workaround**: rejected. Every app would double its classes (`&&`) to beat the theme.

## Consequences

- Atom props now beat component base styles and Component themes. Anything that relied on the theme beating an Atom flips, a visible change shipped as a minor bump.
- Everything a theme sets has to be in `blockle-theme`. Theme authors wrap their declarations in `'@layer': { [layers.theme]: ... }` themselves. Themes don't mix in `atoms()`: an Atom class would sit in `blockle-atom` and tie with the app's Atom props, so a theme writes the same values with `vars` inside the theme layer.
- There is no `core` helper for this yet. Wrapping by hand is noisy and easy to forget; a helper can come later without changing this order.
- A third-party theme that keeps plain `style()` stays unlayered: it beats Atoms and ties with app styles, as before. Nothing detects this; the theme-authoring docs explain the layer.
- The layer names stay as they were, since `layers` is a public `core` export; only the order changed and `theme` was added.
