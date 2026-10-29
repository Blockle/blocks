# Blocks

A React design system: a theming core, a set of components, and themes that style them.

## Language

### Theming

**Color mode**:
The set of colors the UI renders with: `light` or `dark`, or `system` to follow the user's OS preference. Blocks defines which Color modes exist, and every theme provides colors for each of them. A Color mode applies to the whole page. A dark section inside a light page is a matter of surface and text colors, not a different Color mode.
_Avoid_: Color scheme, dark mode, theme

**Color role**:
A shared, named color with a purpose, such as muted text or a raised surface, whose value is defined per Color mode. Roles come in groups by purpose (text, surface, border) and are defined once per theme, so components with the same need, such as Text and Heading, share them.
_Avoid_: Semantic token, alias token

**Intent**:
The meaning a component's color conveys, such as `primary`, `danger` or `success`. Every Intent has the same family of Color roles, so components that share an Intent look consistent. Blocks core exports the `Intent` type; each component's `intent` accepts a subset of it. A component may take `inherit` in place of an Intent to use the surrounding text color; `inherit` is not an Intent.
_Avoid_: Color scheme (for color choices)

**Mode value**:
A one-off color defined for every Color mode at the place it's used, in a component theme or an atom, for a need no Color role covers.
_Avoid_: Color pair, tuple, light-dark value

**Palette**:
A theme's scales of fixed shades, such as `primary-700`. A shade is the same color in every Color mode.
_Avoid_: Color scale, ramp

### Styling

**Atom**:
A style prop, such as `padding` or `opacity`, whose value comes from a fixed set: a theme's token scale or a few literal values.
_Avoid_: Style prop, sprinkle, utility class

### Composition

**Slot**:
A named position in a component, at its start or end, that holds content the consumer composes, such as an Icon or a Button. A Slot is named by where it sits, not by what goes in it. A component composes its actions through Slots rather than building them in.
_Avoid_: Action, addon, adornment

### Overlays

**Placement**:
Where an overlay sits relative to its anchor: a side (`top`, `right`, `bottom`, `left`), and optionally which of the anchor's edges it lines up with (`start` or `end`, centred when left out), as in `top-start`. A Drawer's Placement is a side of the screen; a Toast's Placement uses the screen as its anchor, as in `bottom-end`.
_Avoid_: Position, side, align

### Display

**Tag**:
A compact pill showing a short value, such as a category, a status or a count, colored by an Intent. Removing a Tag is an action composed into it, not a kind of Tag. A Tag is not a form `Label`.
_Avoid_: Badge, chip, pill
