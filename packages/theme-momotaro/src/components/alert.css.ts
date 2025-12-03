import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
} from '@blockle/blocks-core';

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
        error: atoms({
          backgroundColor: 'danger-100',
          color: 'danger-800',
          borderColor: 'danger-300',
        }),
        info: atoms({
          backgroundColor: 'info-100',
          color: 'info-800',
          borderColor: 'info-300',
        }),
        success: atoms({
          backgroundColor: 'success-100',
          color: 'success-800',
          borderColor: 'success-300',
        }),
        warning: atoms({
          backgroundColor: 'warning-100',
          color: 'warning-800',
          borderColor: 'warning-300',
        }),
      },
    },
  },
);
