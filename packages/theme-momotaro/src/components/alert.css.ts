import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

type IntentRoles = (typeof vars.colorRole)['intentDanger'];

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
        error: intentStyle(vars.colorRole.intentDanger),
        info: intentStyle(vars.colorRole.intentInfo),
        success: intentStyle(vars.colorRole.intentSuccess),
        warning: intentStyle(vars.colorRole.intentWarning),
      },
    },
  },
);
