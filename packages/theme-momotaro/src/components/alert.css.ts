import {
  layers,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

type IntentRoles = (typeof vars.colorRole)['danger'];

const intentStyle = (roles: IntentRoles) =>
  style({
    '@layer': {
      [layers.theme]: {
        backgroundColor: roles.subtle,
        color: roles.foreground,
        borderColor: roles.border,
      },
    },
  });

export const alert: ThemeComponentsStyles['alert'] = makeComponentTheme(
  'alert',
  {
    root: style({
      '@layer': {
        [layers.theme]: {
          borderWidth: vars.borderWidth.thin,
          borderStyle: 'solid',
          padding: vars.space[2],
          borderRadius: vars.borderRadius[2],
        },
      },
    }),
    variants: {
      intent: {
        danger: intentStyle(vars.colorRole.danger),
        info: intentStyle(vars.colorRole.info),
        success: intentStyle(vars.colorRole.success),
        warning: intentStyle(vars.colorRole.warning),
      },
    },
  },
);
