import { createVar } from '@vanilla-extract/css';
import { style } from '../../../lib/css/style/style';
import { makeComponentTheme } from '../../../lib/theme/makeComponentTheme';
import { vars } from '../../../lib/theme/vars.css';
import { focusable } from './helpers.css';

const trackBackground = createVar();
const filledTrackBackground = createVar();
const thumbBackground = createVar();

export const slider = makeComponentTheme('slider', {
  base: style({
    blockSize: '20px',
  }),
  track: style({
    blockSize: '4px',
    backgroundColor: trackBackground,
    borderRadius: 'small',
  }),
  filledTrack: style({
    backgroundColor: filledTrackBackground,
  }),
  thumb: style([
    {
      backgroundColor: thumbBackground,
      borderRadius: '50%',
      height: '16px',
      width: '16px',
      boxShadow: `0 0 0 0px color-mix(in srgb,  ${vars.color.primaryLight}, transparent 0%)`,
      ':hover': {
        boxShadow: `0 0 0 8px color-mix(in srgb,  ${vars.color.primaryLight}, transparent 20%)`,
      },
      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          transition: 'box-shadow 0.2s',
        },
      },
    },
    focusable,
  ]),
  variants: {
    size: {
      small: style({
        inlineSize: '100px',
      }),
      medium: style({
        inlineSize: '200px',
      }),
      large: style({
        inlineSize: '300px',
      }),
    },
    colorScheme: {
      primary: style({
        vars: {
          [trackBackground]: vars.color.primaryLight,
          [filledTrackBackground]: vars.color.primary,
          [thumbBackground]: vars.color.primary,
        },
      }),
      secondary: style({
        vars: {
          [trackBackground]: vars.color.primaryLight,
          [filledTrackBackground]: vars.color.secondary,
          [thumbBackground]: vars.color.secondary,
        },
      }),
    },
  },
  defaultVariants: {
    size: 'medium',
    colorScheme: 'primary',
  },
});
