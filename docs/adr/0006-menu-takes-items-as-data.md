# Menu takes its items as data, not as compound parts

`Menu` takes its Menu items as an `items` array (actions, separators and radio groups), and its only child is the trigger element, which it clones and wires up as `Tooltip` does (T323). Most React menu libraries use compound parts (`Menu`, `MenuTrigger`, `MenuList`, `MenuItem`) instead. We picked data because Blocks' real menus are lists of actions and one-of-many choices: one import, markup that is consistent by construction, and dynamic lists that are a plain `.map()` over data. Nothing else in Blocks is built from compound parts.

## Considered Options

- **Compound parts**: rejected for now. They allow anything as an item, such as a router `Link` or a `Tooltip` wrapped around a disabled item, but they need context plumbing and would be the first compound API in Blocks.
- **Controlled `Popover` with an `anchorElement`**: rejected. Every consumer would rebuild the open state and focus handling, which is the workaround Menu replaces.

## Consequences

- Each new kind of Menu item widens the `items` union rather than adding a component.
- Items can't be wrapped individually: no `Tooltip` on an item, and no per-item `className` or `data-*` unless a field is added for it.
- Link items are deferred. A plain `href` field would only render an `<a>`; client-side router links would need a `render`/`as` escape hatch or a move to compound parts. Revisit this ADR when links are designed.
