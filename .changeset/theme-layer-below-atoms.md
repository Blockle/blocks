---
'@blockle/blocks': minor
'@blockle/blocks-core': minor
'@blockle/blocks-theme-momotaro': minor
---

Component themes now sit in a new `blockle-theme` cascade layer, below Atoms. Precedence follows one rule: **defaults < theme < props < your own CSS**.

The layers are ordered, lowest priority first: `blockle-reset` < `blockle-molecule` (component base styles) < `blockle-theme` (Component themes) < `blockle-atom` (Atoms) < `blockle-organism`. Your unlayered styles beat all of them.

What changes for you:

- An app's `className` on a Blocks component always beats the theme and base styles, whatever order the stylesheets load in. A single class is enough: drop any `&&` specificity tricks. For example, `<Dialog className={wide}>` with `inline-size: 50rem` now sets the width.
- Atom props now beat the theme and the component base styles. `padding={0}` removes padding, and `Textarea containerProps={{ padding: 0, backgroundColor: … }}` renders with exactly that.
- `truncate` and `lineClamp` on `Text` no longer beat an explicit `display`, `overflow` or `whiteSpace` Atom. The Atom wins.
- `Select` with `variant="outline"` now has the 1px border the theme always declared. It rendered 3px before.

Momotaro puts every declaration in `blockle-theme` and no longer uses `atoms()`. Components look the same otherwise.

Core exports `layers.theme` so a theme can use the same layer. A theme built with plain `style()` behaves as before: it stays unlayered, and so keeps beating Atoms and base styles. To move it into the layer, see "Writing a theme" in Storybook (Guides).
