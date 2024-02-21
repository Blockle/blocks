import { style } from '../../../lib/css/style/style';
import { makeComponentTheme } from '../../../lib/theme/makeComponentTheme';

export const dropdown = makeComponentTheme('dropdown', {
  base: style({
    backgroundColor: 'white',
    borderRadius: 'small',
    boxShadow: 'medium',
    padding: 'medium',
    vars: {
      '--spacing': '0.5rem',
    },
    selectors: {
      '&[data-open]': {
        transform: 'translate(0, 0)',
        opacity: 1,
      },
    },
    // Apply the animation only if the user has not requested reduced motion
    '@media': {
      '(prefers-reduced-motion: no-preference)': {
        // transform: 'scale(0.9)',
        transform: 'translateY(var(--spacing))',
        transition: 'opacity 80ms linear, transform 80ms',
        opacity: 0,
      },
    },
  }),
  variants: {
    variant: {
      solid: style({
        backgroundColor: 'white',
        border: 'none',
        boxShadow: 'medium',
        color: 'black',
        padding: 'medium',
      }),
      outline: style({
        backgroundColor: 'transparent',
        border: '1px solid black',
        boxShadow: 'none',
        color: 'black',
        padding: 'medium',
      }),
    },
  },
  defaultVariants: {
    variant: 'solid',
  },
});
