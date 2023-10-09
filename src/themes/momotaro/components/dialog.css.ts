import { style } from '@vanilla-extract/css';
import { makeComponentTheme } from '../../../lib/css/theme/makeComponentTheme';
import { atoms } from '../../../lib/css/atoms';

export const dialog = makeComponentTheme('dialog', {
  base: style([
    atoms({
      display: 'flex',
      flexDirection: 'column',
      padding: 'gutter',
      border: 'none',
      overflow: 'auto',
    }),
    {
      minWidth: '300px',
    },
  ]),
  variants: {
    backdrop: style({
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }),
  },
});
