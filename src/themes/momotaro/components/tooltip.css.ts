import { style } from '../../../lib/css/style/style';
import { makeComponentTheme } from '../../../lib/theme/makeComponentTheme';

export const tooltip = makeComponentTheme('tooltip', {
  base: style({
    backgroundColor: 'primary',
    padding: 'small',
  }),
  variants: {
    colorScheme: {
      primary: style({
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1)',
        color: 'white',
      }),
      secondary: style({
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
        color: 'black',
      }),
    },
  },
  defaultVariants: {
    colorScheme: 'primary',
  },
});
