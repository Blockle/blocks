import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

type IntentRoles = (typeof vars.colorRole)['danger'];

const intentStyle = (roles: IntentRoles) =>
  style({
    backgroundColor: roles.subtle,
    color: roles.foreground,
    borderColor: roles.border,
  });

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
        danger: intentStyle(vars.colorRole.danger),
        info: intentStyle(vars.colorRole.info),
        success: intentStyle(vars.colorRole.success),
        warning: intentStyle(vars.colorRole.warning),
      },
    },
  },
);
