import { style } from '../../../lib/css/style/style';
import { makeComponentTheme } from '../../../lib/theme/makeComponentTheme';

export const popover = makeComponentTheme('popover', {
  base: style({
    backgroundColor: 'white',
    borderRadius: 'small',
    boxShadow: 'medium',
    padding: 'medium',
    margin: 'small', // Space between the popover and the anchor element
    selectors: {
      '&[data-open]': {
        transform: 'scale(1)',
        opacity: 1,
      },
    },
    // Apply the animation only if the user has not requested reduced motion
    '@media': {
      '(prefers-reduced-motion: no-preference)': {
        transform: 'scale(0.95)',
        transition: 'opacity 80ms linear, transform 80ms',
        opacity: 0,
      },
    },
  }),
});
