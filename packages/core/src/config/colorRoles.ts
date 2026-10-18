/**
 * The single list of Intents and Color roles. Types and the theme contract
 * both derive from it.
 */
export const intents = [
  'primary',
  'secondary',
  'neutral',
  'danger',
  'success',
  'info',
  'warning',
] as const;

export type Intent = (typeof intents)[number];

const surfaceAndTextRoles = [
  'surface',
  'surfaceRaised',
  'surfaceSunken',
  'surfaceInverse',
  'text',
  'textMuted',
  'textInverse',
  'textDisabled',
  'border',
  'borderStrong',
  'overlay',
  'focusRing',
] as const;

type IntentColorRole<I extends Intent> =
  | I
  | `${I}Hover`
  | `${I}Subtle`
  | `on${Capitalize<I>}`;

export type ColorRole =
  | (typeof surfaceAndTextRoles)[number]
  | IntentColorRole<Intent>;

function intentColorRoles<I extends Intent>(intent: I): IntentColorRole<I>[] {
  const capitalized = `${intent.charAt(0).toUpperCase()}${intent.slice(1)}`;

  return [
    intent,
    `${intent}Hover`,
    `${intent}Subtle`,
    `on${capitalized as Capitalize<I>}`,
  ];
}

export const colorRoles: readonly ColorRole[] = [
  ...surfaceAndTextRoles,
  ...intents.flatMap(intentColorRoles),
];
