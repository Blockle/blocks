# Tabs are built from compound parts, unlike Menu

In-page Tabs are built from `Tabs`, `TabList`, `Tab` and `TabPanel`, and the tab navigation from `TabNav` and the same `Tab` (T324). This makes Tabs the first compound API in Blocks, against ADR-0006's data-driven Menu. ADR-0006 chose data because a Menu item is a short label and an action. A tab is different: its panel holds arbitrary content, each tab composes a status dot or a close `IconButton` through `startSlot`/`endSlot` (ADR-0005), and a tab in a navigation has to be any router link through `asChild` (ADR-0004). ADR-0006 named that last need as the reason to revisit.

## Considered Options

- **Tabs as data (`items` with label and content)**: rejected. Panel content and per-tab Slots become render fields on each item, and a router link would need a `render` escape hatch.
- **One `Tabs` that is also the navigation, with `tab` roles on route links**: rejected. Route navigation is a `nav` of links with `aria-current="page"`; `tablist` semantics there mislead assistive technology. `TabNav` and `Tabs` are two roots that share `Tab` and its look.

## Consequences

- Blocks now has both styles: data for Menu, compound parts for Tabs. A new component picks the one that fits its content, and this ADR and ADR-0006 give the reasons.
- The parts share state through React context, which Blocks didn't need before.
