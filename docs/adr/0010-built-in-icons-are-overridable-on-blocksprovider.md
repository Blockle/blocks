# Built-in icons are overridable ReactNodes on BlocksProvider

A few components draw an icon themselves: Checkbox's check mark, Select's chevron, NumericInput's minus and plus, and the close × on each Toast. Together these are the Icon set. An app overrides them through an `icons` prop on `BlocksProvider`, a partial map from an icon's meaning (`check`, `chevronDown`, `minus`, `plus`, `close`) to a rendered element:

```tsx
<BlocksProvider theme={momotaro} icons={{ check: <Check />, close: <X /> }}>
```

Each component reads its icon from the nearest provider and falls back to Blocks' own SVG when no provider sets it. A nested provider's `icons` merges over its parent's, like `theme` and unlike `colorMode`. Keys are named by meaning, so a new component that shows a check reuses `check`. The component renders the icon inside an `aria-hidden` wrapper whose base style sizes a direct `svg` child to the wrapper and colors it with `currentColor`, so an icon from any library fits without props.

The values are rendered elements, not components, so a Server Component layout can pass them. Rendered elements can cross from a Server Component into the props of a client component such as `BlocksProvider`; a function component can only cross if it's a client module, and most icon libraries don't mark theirs `'use client'`. Because Blocks never calls the icon, it never passes it props: all sizing and coloring comes from CSS.

## Considered Options

- **Components as values** (`check: Check`): rejected. A Server Component can't pass a function to `BlocksProvider` unless the icon library is a client module, and most aren't.
- **Icons on the Theme**: rejected. A Theme is built in vanilla-extract `.css.ts` files and holds only class names and CSS variables, so it has no place for JSX. The icon set is a choice the app makes, not a design token.
- **Keys named by component** (`checkboxCheck`, `toastClose`): rejected. The map would grow with every component, and changing one meaning would take several overrides.
- **An exported icon set or a public hook to read icons**: rejected. Consumers import their own icons directly, and exporting Blocks' defaults would make Blocks an icon source. The read hook stays internal; it can be exported later if someone needs it.

## Consequences

- ADR-0005 stays true: Blocks ships no icon set. The defaults aren't exported, and icons in Slots, such as a dismissable Alert's ×, stay the consumer's own.
- With no `icons`, components render the same icons as before.
- The built-in icons are always decorative: each sits inside a control that has its own accessible name, so swapping an icon never changes what a screen reader announces.
- Stroke width is left to the icon, so an icon keeps its own visual weight.
- A component that starts drawing a new icon adds a key named by its meaning to `BlocksIcons`.
