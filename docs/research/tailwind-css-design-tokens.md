# Tailwind CSS design tokens (v4)

Research note for the token-naming proposal. Scope: Tailwind CSS's official token model only (`tailwindcss` v4.3.3, current stable as of this writing — confirmed via `npm view tailwindcss version`). All claims are sourced from official docs (`tailwindcss.com/docs`) or the `tailwindlabs/tailwindcss` source on the `v4.3.3` tag.

## 1. Theme variables are the token model — one flat namespace, no primitive/semantic split

Tailwind v4 has no config-file token system; tokens are CSS custom properties declared inside an `@theme` block, and the compiler reads them to decide which utility classes and variants to generate:

> "Theme variables are special CSS variables defined using the `@theme` directive that influence which utility classes exist in your project." — [tailwindcss.com/docs/theme](https://tailwindcss.com/docs/theme#what-are-theme-variables)

```css
@theme {
  --color-mint-500: oklch(0.72 0.11 178);
}
```
defining `--color-mint-500` both creates a real `:root` CSS variable **and** makes `bg-mint-500`, `text-mint-500`, `fill-mint-500`, etc. available as utilities (same source, "Relationship to utility classes"). This is Tailwind's core mechanic: **one variable name drives both the runtime CSS variable and the utility-class name** — there is no separate "primitive" input layer that a "semantic" layer maps onto. A project that wants a semantic layer builds it itself (e.g. a second `@theme` or plain `:root` block aliasing raw tokens) — the framework doesn't model that distinction; the docs explicitly contrast `@theme` (token ⇒ utility) with plain `:root` ("use `:root` for defining regular CSS variables that shouldn't have corresponding utility classes") (same source, "Why `@theme` instead of `:root`?").

This is the single biggest structural difference from Blockle's proposed three-layer contract (primitives → semantic tokens → component tokens, `TOKEN-NAMING-PROPOSAL.md:33-40`): Tailwind ships one layer, by design, and treats layering as an application-level concern, not a framework contract.

## 2. Namespaces are prefix-based and each maps to a fixed utility/variant API

Every theme variable lives in a `--<namespace>-<name>` CSS variable, and the namespace alone determines what kind of utility/variant it produces ([tailwindcss.com/docs/theme#theme-variable-namespaces](https://tailwindcss.com/docs/theme#theme-variable-namespaces)):

| Namespace | Produces |
| --- | --- |
| `--color-*` | color utilities (`bg-*`, `text-*`, `fill-*`, …) |
| `--font-*` | `font-family` utilities |
| `--text-*` | `font-size` utilities (paired with a `--text-*--line-height` companion var) |
| `--font-weight-*` | `font-weight` utilities |
| `--tracking-*` | `letter-spacing` utilities |
| `--leading-*` | `line-height` utilities |
| `--tab-size-*` | `tab-size` utilities |
| `--breakpoint-*` | responsive **variants** (`sm:*`, not utilities) |
| `--container-*` | container-query variants (`@sm:*`) **and** `max-w-*`-style size utilities |
| `--spacing-*` (actually a single `--spacing` multiplier, see §4) | spacing/sizing utilities (`px-4`, `max-h-16`, …) |
| `--radius-*` | `border-radius` utilities |
| `--shadow-*`, `--inset-shadow-*`, `--drop-shadow-*`, `--text-shadow-*` | four **separate** shadow namespaces |
| `--blur-*`, `--perspective-*`, `--zoom-*`, `--aspect-*` | filter/layout utilities |
| `--ease-*` | transition-timing-function utilities |
| `--animate-*` | full animation shorthand (keyframes + duration + easing bundled per name) |

Naming within a namespace is free-form — "You can name your theme variables whatever you want within these namespaces, and a corresponding utility with the same name will become available" (same source). Tailwind itself uses two conventions depending on namespace: **numeric scales** for color (`50…950`) and **T-shirt-size scales** (`xs, sm, md, lg, xl, 2xl, …`) for nearly everything else (radius, shadow, text size, breakpoints, container sizes, blur).

## 3. Color: numeric 50–950 steps, OKLCH values, flat palette (no semantic roles)

The default theme defines ~22 color families (`red`, `orange`, `amber`, …, `slate`, `gray`, `zinc`, `neutral`, `stone`, plus newly added `taupe`, `mauve`, `mist`, `olive` on the in-progress palette per [tailwindcss.com/docs/colors](https://tailwindcss.com/docs/colors)), each with **exactly 11 numeric steps**: `50, 100, 200, …, 900, 950`. Verified directly in source:

```css
/* tailwindlabs/tailwindcss @ v4.3.3, packages/tailwindcss/theme.css */
--color-red-50: oklch(97.1% 0.013 17.38);
--color-red-100: oklch(93.6% 0.032 17.717);
/* … */
--color-red-950: oklch(25.8% 0.092 26.042);
```
(https://raw.githubusercontent.com/tailwindlabs/tailwindcss/v4.3.3/packages/tailwindcss/theme.css)

All default color values are expressed in **OKLCH**, which the v4 upgrade guide confirms is a deliberate switch from v3's HSL/RGB-ish space ("Tailwind CSS v4.0 … uses the P3 color gamut … we've updated all of the colors … to take advantage of this wider gamut using the OKLCH color space" — [tailwindcss.com/docs/upgrade-guide](https://tailwindcss.com/docs/upgrade-guide#using-oklch-colors)). This supports Blockle's own OKLCH-based generation choice (`TOKEN-NAMING-PROPOSAL.md:43`) as independently validated industry direction, though Tailwind only ships *raw* scales — it has **no built-in semantic color roles** (no `surface`, `text`, `border`, `danger`, etc.). Any such role naming is left entirely to the consuming project; the official docs model color purely as a palette, confirming the "flat namespace" framing in §1.

## 4. Spacing is a single multiplier, not a discrete named scale

Unlike color/radius/shadow, spacing is **not** a list of named steps. The entire spacing scale derives from one base variable:

```css
--spacing: 0.25rem;
```
(https://raw.githubusercontent.com/tailwindlabs/tailwindcss/v4.3.3/packages/tailwindcss/theme.css, line 327)

Utilities like `px-4`, `gap-6`, `max-h-16` multiply this single `--spacing` value by the bare numeral in the class name (e.g. `p-4` → `calc(var(--spacing) * 4)`), so the "scale" is actually open-ended arithmetic, not an enumerated set of tokens. This is a structurally different approach from Blockle's explicit numeric step map (`spacing.1..8`, `TOKEN-NAMING-PROPOSAL.md:144`) — Tailwind's model trades discrete, auditable steps for unlimited density at the cost of no governance over which values are "allowed."

## 5. Typography: size/line-height pairing, named weight and tracking scales

Font sizes use a T-shirt scale (`xs` … `9xl`) where **each size variable has a sibling line-height variable** using a `--text-*--line-height` suffix convention:
```css
--text-sm: 0.875rem;
--text-sm--line-height: calc(1.25 / 0.875);
```
(theme.css, lines 351–352). This directly couples type size to a default leading rather than leaving line-height as an independent axis — notably different from Blockle's separated `typography.fontSize` and `typography.lineHeight` groups (`TOKEN-NAMING-PROPOSAL.md:132-137`), where any size can combine with any leading role.

Font weight uses a named scale of **nine** steps: `thin(100), extralight(200), light(300), normal(400), medium(500), semibold(600), bold(700), extrabold(800), black(900)` (theme.css lines 376–384) — finer-grained than Blockle's six-step `light…extrabold` (`TOKEN-NAMING-PROPOSAL.md:133`).

Letter spacing (`--tracking-*`) uses `tighter, tight, normal, wide, wider, widest` (six steps) and line-height (`--leading-*`) uses `tight, snug, normal, relaxed, loose` (five steps) (theme.css lines 386–397) — both are named, not numeric, matching Blockle's approach of named rungs for these groups.

## 6. Radius and shadow: T-shirt scales, four distinct shadow namespaces, and a v4 renumbering

Radius: `--radius-xs(0.125rem) … --radius-4xl(2rem)` — 8 named steps (theme.css lines 399–406), versus Blockle's four numeric steps + `full` (`TOKEN-NAMING-PROPOSAL.md:142`).

Shadows are **not one group** in Tailwind; box shadow, inset shadow, drop-shadow filter, and (newer) text-shadow are four separate namespaces (`--shadow-*`, `--inset-shadow-*`, `--drop-shadow-*`, `--text-shadow-*`), each independently scaled (theme.css lines 408–434). Blockle's single `elevation.{1..5}` concept (`TOKEN-NAMING-PROPOSAL.md:154,222`) is deliberately narrower — a reasonable simplification given Blockle doesn't expose filter/text shadows as tokens.

Notably, Tailwind **renamed and reshuffled** its radius/shadow/blur scales between v3 and v4 (`shadow-sm`→`shadow-xs`, old `shadow`→`shadow-sm`, same pattern for `rounded-*` and `blur-*`) specifically "to make them more consistent and predictable" ([tailwindcss.com/docs/upgrade-guide#renamed-utilities](https://tailwindcss.com/docs/upgrade-guide#renamed-utilities)). This is evidence that even Tailwind's own maintainers found a bare/unlabeled smallest-step naming confusing enough to do a breaking rename — relevant precedent if Blockle considers naming its own smallest step.

## 7. Breakpoints and container queries are two separate, compile-time namespaces

`--breakpoint-*` defines **variants** (`sm:`, `md:`, …), not utilities, and is explicitly framed as viewport-based:
```css
--breakpoint-sm: 40rem; --breakpoint-md: 48rem; --breakpoint-lg: 64rem;
--breakpoint-xl: 80rem; --breakpoint-2xl: 96rem;
```
(theme.css lines 329–333). Separately, `--container-*` defines **13** named sizes (`3xs` 16rem … `7xl` 80rem) that drive both container-query variants (`@sm:`) and `max-w-*` utilities (theme.css lines 335–347; namespace table at [tailwindcss.com/docs/theme#theme-variable-namespaces](https://tailwindcss.com/docs/theme#theme-variable-namespaces)). Both are declared the same way as every other theme variable (inside `@theme`), but the docs still describe breakpoints as effectively fixed, compile-time configuration — consistent with Blockle's own decision to keep breakpoints "intentionally absent" from the runtime token contract and as "fixed compile-time configuration" (`TOKEN-NAMING-PROPOSAL.md:117,154,217`). Tailwind doesn't carve out a doctrinal exception for this; it's just that nobody changes breakpoints at runtime in practice.

## 8. z-index has no default scale — it's bare integers, with an opt-in theme namespace

Checked directly in source (`packages/tailwindcss/src/utilities.ts`, `v4.3.3`):
```ts
functionalUtility('z', {
  supportsNegative: true,
  handleBareValue: ({ value }) => (isPositiveInteger(value) ? value : null),
  themeKeys: ['--z-index'],
  handle: (value) => [decl('z-index', value)],
  staticValues: { auto: [decl('z-index', 'auto')] },
})
```
(https://raw.githubusercontent.com/tailwindlabs/tailwindcss/v4.3.3/packages/tailwindcss/src/utilities.ts, around line 663). `theme.css` defines **no** default `--z-index-*` entries — confirmed by grepping the full file. So `z-10`, `z-20`, `z-50` etc. work out of the box as bare numerals (suggested values `0,10,20,30,40,50` per the `suggest('z', …)` call just below), and `--z-index-*` only exists as an **opt-in extension point** for named values a project wants to add. This is the opposite of Blockle's approach of a closed, named enum (`base, sticky, overlay, modal, popover, toast`, `TOKEN-NAMING-PROPOSAL.md:150`) — Tailwind intentionally leaves z-index ungoverned by default, which is exactly the kind of "silent magic numbers" problem a named contract like Blockle's guards against.

## 9. Motion: easing is a named scale, duration/animation are bundled, not separated

```css
--ease-in: cubic-bezier(0.4,0,1,1);
--ease-out: cubic-bezier(0,0,0.2,1);
--ease-in-out: cubic-bezier(0.4,0,0.2,1);
--animate-spin: spin 1s linear infinite;
--animate-ping: ping 1s cubic-bezier(0,0,0.2,1) infinite;
```
(theme.css lines 436–443). There is **no `--duration-*` scale that applies globally to transitions** as a distinct named set of steps the way Blockle proposes (`motion.duration.{fast,normal,slow}`, `TOKEN-NAMING-PROPOSAL.md:143`) — Tailwind's `duration-*` utility instead takes arbitrary millisecond bare values directly (not confirmed as a theme namespace in `theme.css`), and its `--animate-*` namespace bundles keyframes + duration + easing into one indivisible utility per animation name, rather than separating duration and easing as independent composable tokens the way Blockle's `motion.duration` / `motion.easing` split does. Blockle's separation of `duration` and `easing` into independently combinable token families is a clearer contract than Tailwind's bundled `--animate-*` approach for anything beyond canned keyframe animations.

## 10. Opacity: no default named scale either — same bare-value pattern as z-index

Grepping `theme.css` finds no `--opacity-*` entries; `opacity` is also a `themeKeys: ['--opacity']`-driven utility in `utilities.ts` but ships with **no default values**, working instead off bare percentage integers (`opacity-50`) and the same namespace doubles as the modifier resolution path for color opacity (`bg-black/50`) via `theme.resolve(modifier.value, ['--opacity'])` (https://raw.githubusercontent.com/tailwindlabs/tailwindcss/v4.3.3/packages/tailwindcss/src/utilities.ts, lines ~226–228, 524). Blockle's explicit `opacity.{0,10,…,100}` enum (`TOKEN-NAMING-PROPOSAL.md:149`) is again a closed, documented set where Tailwind leaves an open numeric range.

## 11. Dark mode is a variant, not a token/scheme-swap mechanism

Tailwind's dark mode is implemented as a **CSS variant** (`dark:*`) that conditionally applies a second declaration per utility, driven by default off `prefers-color-scheme`, with documented opt-in overrides to a class or `data-*` attribute selector via `@custom-variant`:

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```
([tailwindcss.com/docs/dark-mode](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually)). Concretely this means authors write **both** values at every call site (`bg-white dark:bg-gray-800`), not a single semantic token whose underlying CSS variable is reassigned per scheme. This is the inverse of Blockle's model (ADR `docs/adr/0002-color-schemes-via-light-dark.md`), where components consume one role name (e.g. `surface.default`) whose value resolves per scheme through `light-dark()`, so call sites never carry scheme-specific logic. Tailwind's own docs acknowledge the burden this places on the author — the three-way "light/dark/system" example requires hand-written `localStorage`/`matchMedia` JS plus manual class toggling (same page, "With system theme support") — there is no built-in system-preference token resolution. This is a strong, citable contrast point: Tailwind's variant-per-utility model scales class count and duplicated authoring effort with every dark-mode-aware utility, whereas Blockle's role-indirection model scales token count once per role regardless of call-site count.

## 12. No built-in semantic/raw separation; "sharing across projects" is the closest analog

Nothing in the `@theme` docs defines a "semantic" vs "primitive" tier. The closest built-in affordance is `@theme inline` (resolve a theme variable through another CSS variable at definition time rather than at variable-resolution time) and "Sharing across projects," where teams are told to put a theme file in its own package and `@import` it — effectively encouraging ad hoc layering/overriding, not a documented two-tier contract ([tailwindcss.com/docs/theme#referencing-other-variables](https://tailwindcss.com/docs/theme#referencing-other-variables), [#sharing-across-projects](https://tailwindcss.com/docs/theme#sharing-across-projects)). Teams that want Chakra/Blockle-style semantic roles build them as app-level CSS variables outside `@theme` (so they don't generate utilities) and reference them via arbitrary values (`bg-[var(--surface)]`) — this is implied by the docs' own distinction between `@theme` and `:root` (§1) but is never spelled out as a recommended pattern in the fetched pages.

## Recommendations for Blockle (inspiration, not adoption)

1. **Keep the three-layer contract — Tailwind's single-layer model is a known pain point it doesn't solve.** Tailwind's flat `@theme` namespace conflates "palette input" and "thing a utility is generated from." Blockle's primitive/semantic/component split is a genuine improvement for a component library (it's exactly what Tailwind *doesn't* give you), so this is a point of validated difference, not something to copy.
2. **Consider the size/line-height pairing convention for typography**, but as an *optional* paired default rather than a hard coupling: Tailwind's `--text-*--line-height` suffix shows a clean way to ship a sensible default leading per size while (per the component theme pattern Blockle already uses) still letting a component theme override `lineHeight` independently. Don't copy the forced coupling; copy the "ship a good default, allow override" idea.
3. **The v3→v4 shadow/radius/blur rename is a cautionary precedent, not a pattern to copy.** It shows that an unlabeled "smallest step" (plain `shadow`, `rounded`) reliably causes confusion about where it sits in the scale — supports Blockle's existing decision to use explicit numeric steps (`border.radius.1..4`) rather than an unlabeled default-sized entry.
4. **Z-index and opacity as bare numeric utilities is an anti-pattern for Blockle's goals, not inspiration.** Tailwind's choice to leave these ungoverned (any integer passes) is a deliberate trade for authoring flexibility in a utility framework; Blockle is building a component-contract system, where the enum-style closed sets it already proposes (named z-index layers, percentage-keyed opacity) are the correct opposite choice. Cite Tailwind here only as the "what we're avoiding" baseline.
5. **Keep breakpoints out of the runtime token contract — Tailwind's own practice (if not its docs) agrees.** Even though `--breakpoint-*` is defined through the same `@theme` mechanism as every other token, Tailwind only ever recommends changing it at build/config time, never dynamically. This reinforces, rather than contradicts, Blockle's stated choice.
6. **Do not adopt Tailwind's variant-based dark mode for Blockle's component contract.** It's the right call for a utility-class framework with no component abstraction layer, but it inverts Blockle's indirection benefit (one role name, theme-level reassignment) by pushing scheme-awareness back to every call site. This is a difference worth stating explicitly in the proposal's comparison table if Tailwind is referenced there, since it is structurally opposed to Blockle's chosen color-role mechanism, not merely a stylistic variant of it.
7. **OKLCH-based palette derivation is independently corroborated.** Tailwind v4's full palette migration to OKLCH for wider-gamut, visually-even color scales ([upgrade guide](https://tailwindcss.com/docs/upgrade-guide#using-oklch-colors)) is a second credible, widely-shipped precedent (alongside the systems already in the proposal's comparison table) for Blockle's own OKLCH-based generation approach — worth citing as evidence in that table, not as a new design decision.

## Sources

- https://tailwindcss.com/docs/theme (theme variables, namespaces, customization, sharing across projects)
- https://tailwindcss.com/docs/colors (default color palette, OKLCH values, named families)
- https://tailwindcss.com/docs/dark-mode (variant-based dark mode, manual toggling, system-theme example)
- https://tailwindcss.com/docs/upgrade-guide (v4 browser requirements, OKLCH migration, v3→v4 shadow/radius/blur renumbering)
- https://raw.githubusercontent.com/tailwindlabs/tailwindcss/v4.3.3/packages/tailwindcss/theme.css (authoritative default theme variable values — fonts, colors, text/line-height pairs, font-weight, tracking, leading, radius, shadow families, ease, animate)
- https://raw.githubusercontent.com/tailwindlabs/tailwindcss/v4.3.3/packages/tailwindcss/src/utilities.ts (z-index and opacity utility generation — confirms no default named scale, bare-integer/percentage handling, `themeKeys` extension points)
- `npm view tailwindcss version` → `4.3.3` (confirms the tag used for source citations is the current stable release, not a prerelease branch)

## Gaps / not verified

- Could not confirm from the fetched docs pages whether Tailwind documents a recommended semantic-token pattern anywhere outside `@theme`/`:root` (e.g. in a blog post or component-library guide); only the framework-level absence of a semantic tier is verified.
- `--duration-*` theme namespace existence was not independently located in `theme.css` or in the fetched slice of `utilities.ts`; stated as "not confirmed as a theme namespace" rather than a definitive negative.
- The `tailwindcss.com/docs/z-index` page could not be fetched as readable markdown (returned client-rendered testimonial boilerplate instead of content); the z-index behavior above is sourced entirely from `utilities.ts` and `theme.css`, which is a stronger primary source regardless.
