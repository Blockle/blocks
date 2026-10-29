# Atoms are a closed scale; one-off values belong in consumer styles

An Atom takes only values from a fixed set: a theme's token scale or a few literal values. Atoms never accept arbitrary values at runtime, and a set doesn't grow to cover one consumer's layout. A value is added only when it comes from a token scale, when Blocks' own components need it, or when it is a CSS keyword (or a reset like `0`) that apps commonly need, such as the `grab`, `grabbing`, `text` and `not-allowed` cursors (T319) or `minInlineSize: 0` to let a flex item shrink (T314). A keyword set stays small and fixed, so it costs only a few classes. One-off values, such as a 0.4 fade or a badge overhanging its anchor's corner, belong in the consumer's own styles: a `className` from their own stylesheet, or inline `style` for values only known at runtime. Every Atom value is compiled into a class in core's CSS, which every app ships, so open-ended sets would bloat the bundle for everyone. Runtime values would need inline custom properties, which ADR 0001 already rejected because they break under a strict CSP. A closed scale also keeps consumers on theme tokens.

## Considered Options

- **A `muted` opacity step**: rejected. It was asked for in T320 for faded drag states, but it has no token scale behind it and only one consumer needs it.
- **Inset Atoms that take the `space` scale, negative steps included**: rejected. It was asked for in T320 to overhang a count pill. That would add a class for every space step on all six inset properties to serve one overlay.
- **Arbitrary values through CSS variables**: rejected for the CSP reason above, and because it would turn Atoms into an untyped escape hatch.
