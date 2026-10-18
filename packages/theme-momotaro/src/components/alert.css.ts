import {
  atoms,
  type ComponentThemes,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

type AlertIntent = ComponentThemes['alert']['variants']['intent'];

/**
 * Tinted alert colors, mixed from Color roles so they follow the Color scheme.
 * - Text mixes the hover shade towards `text`, which raises contrast in both schemes.
 * - The border sits between the solid and the subtle shade.
 */
function intentStyle(intent: AlertIntent) {
  return style([
    atoms({ backgroundColor: `${intent}Subtle` }),
    {
      color: `color-mix(in srgb, ${vars.color[`${intent}Hover`]} 80%, ${vars.color.text})`,
      borderColor: `color-mix(in srgb, ${vars.color[intent]} 40%, ${vars.color[`${intent}Subtle`]})`,
    },
  ]);
}

export const alert: ThemeComponentsStyles['alert'] = makeComponentTheme(
  'alert',
  {
    root: atoms({
      borderWidth: 'thin',
      borderStyle: 'solid',
      padding: 2,
      borderRadius: 2,
    }),
    variants: {
      intent: {
        danger: intentStyle('danger'),
        info: intentStyle('info'),
        success: intentStyle('success'),
        warning: intentStyle('warning'),
      },
    },
  },
);
