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
The meaning a component's color conveys, such as `primary`, `danger` or `success`. Every Intent has the same family of Color roles, so components that share an Intent look consistent.
_Avoid_: Color scheme (for color choices)

**Mode value**:
A one-off color defined for every Color mode at the place it's used, in a component theme or an atom, for a need no Color role covers.
_Avoid_: Color pair, tuple, light-dark value

**Palette**:
A theme's scales of fixed shades, such as `primary-700`. A shade is the same color in every Color mode.
_Avoid_: Color scale, ramp
