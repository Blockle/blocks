import { createVar } from '@vanilla-extract/css';
import { style } from '../../../lib/css/style/style';
import { makeComponentTheme } from '../../../lib/theme/makeComponentTheme';
import { vars } from '../../../lib/theme/vars.css';
import { focusable } from './helpers.css';

const activeScaleFactor = createVar();

export const switchTheme = makeComponentTheme('switch', {
  base: style([
    {
      width: 52,
      height: 32,
      borderRadius: 'xlarge',
      backgroundColor: 'textLight',
      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          transition: 'background-color 120ms linear',
        },
      },
      selectors: {
        '&[data-checked="true"]': {
          backgroundColor: vars.color.secondary,
        },
      },
      // Scale the switch when it's `:active`
      vars: {
        [activeScaleFactor]: '1',
      },
      ':active': {
        vars: {
          [activeScaleFactor]: '0.96',
        },
      },
    },
    focusable,
  ]),
  slider: style({
    width: 24,
    height: 24,
    top: 4,
    left: 4,
    transform: `translateX(0) scale(calc(0.9 * ${activeScaleFactor}))`,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 'xlarge',
    selectors: {
      '&[data-checked="true"]': {
        transform: `translateX(20px) scale(${activeScaleFactor})`,
      },
    },
    '@media': {
      '(prefers-reduced-motion: no-preference)': {
        transition: 'transform 120ms ease-out',
      },
    },
  }),
});
