# List semantics come from a `List` component, not from `listStyle`

WebKit stops exposing a `ul` or `ol` with `list-style: none` as a list, so a List without markers needs `role="list"`. Blocks sets that role in a dedicated `List` component, which renders a `ul` (or its `asChild` element, such as an `ol`) with markers removed and `role="list"`. Apps no longer add the role by hand, which also tripped Biome's `noRedundantRoles` on `<ul role="list">` (T405). `List` does no layout: wrap it in `Stack` or `Inline` with `asChild` for direction and gap. A `role` the app passes replaces `role="list"`.

## Considered Options

- **Add `role="list"` automatically when `listStyle="none"` lands on a `ul`/`ol`**: rejected. It needs the component to detect its child's element through `asChild`, which ADR-0004 rules out as unreliable, for example with a lazy or custom child. Guessing wrong puts `role="list"` on an element that isn't a list.
- **Keep markers hidden with a CSS trick that WebKit doesn't treat as `none`**: rejected. It depends on a WebKit heuristic that can change, and only manual VoiceOver testing could confirm it.
- **A `list` prop on `Stack`/`Inline` that renders a `ul`**: rejected. It is a second way to choose the element besides `asChild`, which ADR-0004 removed.
- **`List` with its own layout props (`gap`, direction, alignment)**: rejected. It repeats `Stack` and `Inline`, which stay the one place layout lives.

## Consequences

- A marker-less list is written `<Stack gap={1} asChild><List>…</List></Stack>`, and an ordered one `<List asChild><ol>…</ol></List>`. `List` trusts its child to be a `ul` or `ol`; it doesn't check.
- The `listStyle` Atom stays for marker removal outside lists, but on a `ul`/`ol` apps use `List` instead.
