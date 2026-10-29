# Components choose their element with `asChild`; `Text` alone keeps `tag`

A component renders its default element, and a consumer who needs a different one passes `asChild` and writes that element as the child. `Text` is the one exception: it keeps a `tag` prop next to `asChild`, because choosing the element (`p`, `span`, `strong`, `label`, …) is part of nearly every use of it, and `tag` types its `ref` per element. `Stack` and `Inline` dropped `tag` (and `Stack` its `start` prop) in T366, so every other component works the way `Box`, `Button`, `Link` and `Heading` already did. Two ways to choose the element confused consumers: they had to know which component took which prop, `tag` was silently ignored next to `asChild`, and `tag`-based behaviour stopped working under `asChild`.

## Considered Options

- **`asChild` only, `Text` included**: rejected. The common case, `<Text tag="p">`, would become `<Text asChild><p>…</p></Text>`, and `Text` would lose its per-element `ref` typing.
- **Keep both everywhere, documented**: rejected. It keeps both ways of choosing the element on every component that has `tag`, and with them the `tag`-dependent defaults that `asChild` skips.
- **`tag` on layout and typography components, `asChild` on interactive ones**: rejected. `tag` only covers a short, fixed list of elements, so layout components would still need `asChild` for anything else.

## Consequences

- Lists no longer drop their markers by default (T313). The component can't reliably tell its child's element, so consumers pass the `listStyle` Atom themselves: `<Stack asChild gap={2} listStyle="none"><ul>…</ul></Stack>`.
- This was a breaking change released as a minor version, a deliberate call for a hobby project.
