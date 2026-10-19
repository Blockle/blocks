# Blocks

A React design system: a theming core, a set of components, and themes that style them.

## Language

### Theming

**Color scheme**:
Whether the UI renders light or dark: `light`, `dark`, or `system` (follow the user's OS preference).
_Avoid_: Color mode, dark mode, theme mode

**Color role**:
A named color with a purpose, such as `surface`, `text` or `primaryHover`, whose value differs per Color scheme. Components and atoms use roles.
_Avoid_: Semantic token, alias token

**Palette**:
A theme's fixed scales of shades (`neutral-100…900`, one per Intent) that do not change with the Color scheme. The raw material that Color roles are built from.
_Avoid_: Ramp, color scale

### Component variants

**Intent**:
The meaning a component's color conveys, such as `primary`, `secondary`, `neutral`, `danger`, `success`, `info` or `warning`. Link also accepts `inherit`, meaning the surrounding text color.
_Avoid_: Color scheme, variant (for color choices), error (use `danger`)

**Variant**:
A component's visual style independent of color, such as `solid`, `outline` or `ghost`.
_Avoid_: Using it for color choices; that is an Intent
