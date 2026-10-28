# Blocks

A React design system: a theming core, a set of components, and themes that style them.

## Language

### Theming

**Color scheme**:
Whether the UI renders light or dark: `light`, `dark`, or `system` (follow the user's OS preference).
_Avoid_: Color mode, dark mode, theme mode

**Color role**:
A named color with a purpose, whose value differs per Color scheme. Neutral roles live in `vars.color` as nested paths (`surface.raised`, `text.muted`, `border.strong`, `focusRing`, `overlay`). Each Intent has the same family in `vars.color.intent.<intent>`: `solid.default`, `solid.hover`, `subtle`, `contrast` (content on the solid fill), `foreground` (intent-colored content on a neutral surface) and `border`. Component themes and atoms use roles by default.
_Avoid_: Semantic token, alias token

**Palette**:
A theme's fixed scales of shades: one family per Intent, steps `50`–`950`, exposed next to the roles as `vars.color.<family>.<step>`. Shades do not change with the Color scheme. They are the raw material that Color roles are built from, and are available directly for deliberate fixed colors.
_Avoid_: Ramp, color scale

### Component variants

**Intent**:
The meaning a component's color conveys, such as `primary`, `secondary`, `neutral`, `danger`, `success`, `info` or `warning`. Link also accepts `inherit`, meaning the surrounding text color. Each component theme maps its own `intent` variants to colors. The `neutral` Intent's roles are not the same as the neutral Color roles.
_Avoid_: Color scheme, variant (for color choices), error (use `danger`)

**Variant**:
A component's visual style independent of color, such as `solid`, `outline` or `ghost`.
_Avoid_: Using it for color choices; that is an Intent
