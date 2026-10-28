# Tokens and theming proposal

## Color schemes

Should respect system color scheme preference by default. Allow overriding with a specific color scheme if needed.

## Palette

- The Palette lives in `vars.color`, next to the roles, as `vars.color.<family>.<step>`. This is `main`'s single color namespace, nested.
- The families are the seven Intents: `primary`, `secondary`, `neutral`, `danger`, `success`, `info`, `warning`.
- Every family has the steps `50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950`. Core types them.
- There is no `white` or `black`. Themes write them as literals (`'#fff'`, `'#000'`) where a role needs them.
- Color roles reference palette variables (`vars.color.neutral[800]`), not hex values, so the emitted roles read `light-dark(var(--color-neutral-800), …)`.

### `generateColorScale`

```ts
generateColorScale('#5E4DBA'); // → { 50: '#…', 100: '#…', …, 950: '#…' }
```

- Takes one hex color and returns a full scale, built in OKLCH: the seed's hue, a fixed lightness ramp, and chroma that tapers at both ends.
- The seed appears exactly, at the step whose target lightness is closest.
- Returns plain hex strings, gamut-mapped to sRGB. Authors adjust a step by spreading over the result, and a family can be written by hand entirely:

```ts
const palette = {
  primary: generateColorScale('#5E4DBA'),
  danger: { ...generateColorScale('#B32422'), 900: '#4D0A08' }, // one step tweaked
  secondary: { 50: '#F0FDFC', 100: '#DFFAF9', /* … */ 950: '#0E5A80' }, // multihue, hand-written
};
```

## Color roles

### Neutral roles (`vars.color`)

Each role has at least one consumer in the current components.

| Role | Used for |
| --- | --- |
| `surface.default` | Page and provider background |
| `surface.raised` | Cards, popovers, dialogs, inputs |
| `surface.sunken` | Wells, tracks, skeletons |
| `surface.inverse` | Tooltip |
| `text.default` | Body text |
| `text.muted` | Secondary text, placeholders |
| `text.disabled` | Disabled controls |
| `text.inverse` | Text on `surface.inverse` |
| `border.default` | Dividers, quiet outlines |
| `border.strong` | Input outlines (needs 3:1 against the surface) |
| `focusRing` | Focus outline |
| `overlay` | Dialog and drawer backdrop |

### Applying Intents in component themes

Core provides the intent roles. It does not apply them. Each component theme maps its own `intent` variants to colors, explicitly, in its own file. This is `main`'s model, with scheme-aware values:

```ts
// momotaro button.css.ts
const intentColor = createVar();
const contrastColor = createVar();
const hoverBackgroundColor = createVar();

variants: {
  variant: {
    solid: style({ backgroundColor: intentColor, color: contrastColor }),
    ghost: style({ color: intentColor, background: 'transparent' }),
  },
  intent: {
    primary: style({
      vars: {
        [intentColor]: vars.color.intent.primary.solid.default,
        [contrastColor]: vars.color.intent.primary.contrast,
        [hoverBackgroundColor]: vars.color.intent.primary.subtle,
      },
    }),
    danger: style({
      vars: {
        [intentColor]: vars.color.intent.danger.solid.default,
        [contrastColor]: vars.color.intent.danger.contrast,
        // a one-off chosen for this component only
        [hoverBackgroundColor]: lightDark(vars.color.danger[200], vars.color.danger[800]),
      },
    }),
    // ...
  },
},
defaultVariants: { intent: 'primary' },
```

## Atoms

A color atom value is its dotted path under `vars.color`, generated from the contract with no hand-kept map. `backgroundColor`, `color` and `borderColor` all accept the same set, which is every color in the contract:

| Values | Example | Scheme-aware |
| --- | --- | --- |
| Neutral roles | `'surface.raised'`, `'text.muted'`, `'border.strong'`, `'focusRing'`, `'overlay'` | Yes |
| Intent roles | `'intent.danger.foreground'`, `'intent.success.subtle'` | Yes |
| Palette | `'primary.600'`, `'neutral.50'` | No, fixed |
| Keywords | `'currentColor'`, `'transparent'` | — |

```tsx
<Box backgroundColor="surface.raised" color="text.muted" borderColor="border.default" />
<Box backgroundColor="intent.danger.subtle" color="palette.primary.600" />
<Box backgroundColor="secondary.400" color="neutral.950" />  {/* deliberately fixed brand badge */}
```

## Foundation tokens

These tokens are the same in both schemes. Changes from today are marked.

| Group | Keys | Notes |
| --- | --- | --- |
| `fontFamily` | `body`, `heading`, `mono` | Unchanged |
| `fontSize` | `xsmall`, `small`, `medium`, `large`, `xlarge`, `display` | Unchanged. Same T-shirt vocabulary as `Size`/`IconSize`; don't introduce `extraSmall`. |
| `fontWeight` | `light` 300, `normal` 400, `medium` 500, `semibold` 600, `bold` 700 | **Changed.** `strong`/`bold` (700/800) become `semibold`/`bold` (600/700), so `bold` means what CSS `bold` means. `bold` silently gets lighter, so the migration audits every `bold` usage. |
| `lineHeight` | `compact`, `snug`, `normal`, `relaxed` | Unchanged |
| `letterSpacing` | `tight`, `normal`, `wide`, `wider` | Unchanged |
| `space` | `1..8` | **Changed.** `spacing` becomes `space`. Values in `rem`. |
| `radius` | `1..4`, `full` | **Changed.** `border.radius` becomes `radius`. `full` (`9999px`) is added because themes currently hand-write `'50%'` and `12`. |
| `borderWidth` | `thin`, `thick` | **Changed.** `border.width` becomes `borderWidth`. |
| `shadow` | `1..3` | **Changed.** It moves out of the scheme group and colors itself with `lightDark()`. Levels `1`–`3` keep their values; `4` and `5` are dropped, because only `2` (Select, Popover, inputs) and `3` (Dialog) are used. |
| `motion.duration` | `fast`, `normal`, `slow` | **Changed.** `transition` becomes `motion.duration`. Hard-coded `120ms`, `180ms` and `0.2s` in themes move onto it. |
| `motion.easing` | `standard`, `enter`, `exit` | **New.** Replaces the ad-hoc `ease-out` curves. Momotaro's `bounceOut` overshoot stays a private theme constant. |

These are deliberately left out:

- **`zIndex`**: Dialog and Drawer use `showModal()`, and Popover uses the popover API, so all three render in the top layer. Tooltip and Toast don't yet; moving Toast to the popover API is a separate change. There is no `zIndex` token today either.
- **An `opacity` scale**: nothing consumes it. Translucency belongs in role values (`overlay`) or in `color-mix()`.
- **Breakpoints**: they stay compile-time constants.

All values are CSS-ready strings or unitless numbers where CSS expects them. `rem` is used for lengths. Core never converts pixels silently; `pixelsToRem()` stays as an opt-in helper.

## `makeTheme` input

```ts
type SchemeValue = { light: string; dark: string };
type PaletteStep = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

type IntentRoles = {
  solid: Record<'default' | 'hover', SchemeValue>;
  subtle: SchemeValue;
  contrast: SchemeValue;
  foreground: SchemeValue;
  border: SchemeValue;
};

type ColorInput = Record<Intent, Record<PaletteStep, string>> & {
  surface: Record<'default' | 'raised' | 'sunken' | 'inverse', SchemeValue>;
  text: Record<'default' | 'muted' | 'disabled' | 'inverse', SchemeValue>;
  border: Record<'default' | 'strong', SchemeValue>;
  focusRing: SchemeValue;
  overlay: SchemeValue;
  intent: Record<Intent, IntentRoles>;
};

type ThemeInput = {
  name: string;
  tokens: {
    fontFamily: Record<'body' | 'heading' | 'mono', string>;
    fontSize: Record<'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'display', string>;
    fontWeight: Record<'light' | 'normal' | 'medium' | 'semibold' | 'bold', number>;
    lineHeight: Record<'compact' | 'snug' | 'normal' | 'relaxed', number | string>;
    letterSpacing: Record<'tight' | 'normal' | 'wide' | 'wider', string>;
    space: Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, string>;
    radius: Record<1 | 2 | 3 | 4 | 'full', string>;
    borderWidth: Record<'thin' | 'thick', string>;
    shadow: Record<1 | 2 | 3, string>; // colors use lightDark()
    motion: {
      duration: Record<'fast' | 'normal' | 'slow', string>;
      easing: Record<'standard' | 'enter' | 'exit', string>;
    };
  };
  color: ColorInput;
  components: ThemeComponentsStyles;
};
```

The input shape matches the `vars` shape one-to-one (`tokens.space` is `vars.space`, `color.text.muted` is `vars.color.text.muted`), with no renaming between what the author writes and what components read.

## Full example: every token

Momotaro's `makeTheme` call. Values are Momotaro's current ones where they exist. New `foreground` and `border` shades are illustrative, and the contrast test picks the final ones.

```ts
import { lightDark, makeTheme, pixelsToRem, vars } from '@blockle/blocks-core';

import { components } from './components/index.js';
import { palette } from './palette.js'; // hand-written, seven families, steps 50–950

const c = vars.color;
const white = '#fff';
const black = '#000';
const shadowColor = lightDark('rgb(0 0 0 / 0.08)', 'rgb(0 0 0 / 0.4)');

export const momotaro = makeTheme({
  name: 'momotaro',

  // ── Foundation tokens: the same in both schemes ──────────────────────────
  tokens: {
    fontFamily: {
      body: '"Rubik", sans-serif',
      heading: '"Rubik", sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    fontSize: {
      xsmall: pixelsToRem(12),
      small: pixelsToRem(14),
      medium: pixelsToRem(16),
      large: pixelsToRem(20),
      xlarge: pixelsToRem(24),
      display: 'clamp(2rem, 1.5rem + 2.5vw, 3.5rem)',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      compact: 1.1,
      snug: 1.3,
      normal: 1.5,
      relaxed: 1.7,
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.05em',
      wider: '0.1em',
    },
    space: {
      1: pixelsToRem(4),
      2: pixelsToRem(8),
      3: pixelsToRem(16),
      4: pixelsToRem(24),
      5: pixelsToRem(32),
      6: pixelsToRem(40),
      7: pixelsToRem(48),
      8: pixelsToRem(64),
    },
    radius: {
      1: pixelsToRem(4),
      2: pixelsToRem(8),
      3: pixelsToRem(16),
      4: pixelsToRem(32),
      full: '9999px',
    },
    borderWidth: {
      thin: '1px',
      thick: '2px',
    },
    shadow: {
      1: `0 4px 8px ${shadowColor}`,
      2: `0 8px 16px ${shadowColor}`, // Select, Popover, inputs
      3: `0 16px 24px ${shadowColor}`, // Dialog
    },
    motion: {
      duration: {
        fast: '80ms',
        normal: '120ms',
        slow: '240ms',
      },
      easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        enter: 'cubic-bezier(0, 0, 0.2, 1)',
        exit: 'cubic-bezier(0.4, 0, 1, 1)',
      },
    },
  },

  color: {
    // ── Palette: fixed shades, emitted as vars.color.<family>.<step> ───────
    ...palette,

    // ── Neutral roles: { light, dark } becomes light-dark(light, dark) ─────
    surface: {
      default: lightDark(white, '#121212'),
      raised: lightDark(white, '#1E1E1E'),
      sunken: lightDark(c.neutral[100], black),
      inverse: lightDark('rgb(0 0 0 / 0.8)', 'rgb(255 255 255 / 0.9)'),
    },
    text: {
      default: lightDark(black, c.neutral[100]),
      muted: lightDark(c.neutral[800], c.neutral[400]),
      disabled: lightDark(c.neutral[400], c.neutral[800]),
      inverse: lightDark(white, black),
    },
    border: {
      default: lightDark(c.neutral[200], c.neutral[800]),
      strong: lightDark(c.neutral[400], c.neutral[700]),
    },
    focusRing: lightDark(c.primary[300], c.secondary[500]),
  },

  components,
});
```

What component themes and app code read:

```text
vars.fontFamily.{body, heading, mono}
vars.fontSize.{xsmall, small, medium, large, xlarge, display}
vars.fontWeight.{light, normal, medium, semibold, bold}
vars.lineHeight.{compact, snug, normal, relaxed}
vars.letterSpacing.{tight, normal, wide, wider}
vars.space.{1..8}
vars.radius.{1..4, full}
vars.borderWidth.{thin, thick}
vars.shadow.{1, 2, 3}
vars.motion.duration.{fast, normal, slow}
vars.motion.easing.{standard, enter, exit}

vars.color.{primary, secondary, neutral, danger, success, info, warning}.{50, 100, …, 900, 950}

vars.color.surface.{default, raised, sunken, inverse}
vars.color.text.{default, muted, disabled, inverse}
vars.color.border.{default, strong}
vars.color.focusRing
vars.color.overlay

vars.color.intent.<intent>.solid.{default, hover}
vars.color.intent.<intent>.{subtle, contrast, foreground, border}
```

The emitted CSS for a few of them (vanilla-extract hashes the real variable names):

```css
.momotaro_theme {
  --color-neutral-800: #3C3C3C;
  --color-danger-700: #B32422;
  --color-text-muted: light-dark(var(--color-neutral-800), var(--color-neutral-400));
  --color-intent-danger-solid-default: light-dark(var(--color-danger-700), var(--color-danger-400));
}
```

## Migration sketch

All of this lands as one major release, together with #253.

1. Core: switch scheme emission to `light-dark()`, have the provider set `color-scheme`, and move `shadow` into `tokens`, with today's role names. Add the browser tests listed under *Color schemes*. Everything else depends on this step.
2. Core: add the color-math module, `lightDark`, `generateColorScale` and `checkContrast` (`/testing`).
3. Core: the new color contract. Palette families with steps `50`–`950` in `vars.color`, nested neutral roles, `vars.color.intent`, and dotted atom keys.
4. Momotaro: add `50`/`950` shades, fill in the roles, map each component theme's `intent` variants to intent roles (replacing this branch's `intentStyle` helper), and add the `checkContrast` test. This takes over #263's acceptance gate.
5. Rename the foundation tokens (`fontWeight`, `space`, `radius`, `borderWidth`, `motion`) and audit `bold` usages.

## Out of scope

- Optional slots with a `className` on every element (separate issue)
- A core mechanism that applies Intents for component themes (an "Accent")
- `solid.pressed`, until a component styles `:active`
- Regenerating Momotaro's palette with `generateColorScale`
- More than two Color schemes
- Moving Toast and Tooltip to the top layer
