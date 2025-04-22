import { atoms, makeComponentTheme, vars } from '@blockle/blocks-core';
import { createVar, style } from '@vanilla-extract/css';
import { focusable } from './helpers.css';

const activeScaleFactor = createVar();

export const switchTheme = makeComponentTheme('switch', {
  base: style([
    atoms({
      borderRadius: 'xlarge',
      backgroundColor: 'textLight',
    }),
    {
      width: 52,
      height: 32,
      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          transition: `background-color 120ms linear, box-shadow ${vars.transition.fast}`,
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
  slider: style([
    atoms({
      borderRadius: 'xlarge',
    }),
    {
      width: 24,
      height: 24,
      top: 4,
      left: 4,
      transform: `translateX(0) scale(calc(0.9 * ${activeScaleFactor}))`,
      position: 'absolute',
      backgroundColor: 'white',
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
    },
  ]),
});
