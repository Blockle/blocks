import { createVar, style } from '@vanilla-extract/css';
import { atoms } from '../../lib/css/atoms';
import { blocksLayer } from '../../lib/css/layers/layers.css';
import { vars } from '../../lib/theme/vars.css';
import { focusable } from '../../themes/momotaro/components/helpers.css';

const activeScale = createVar();

export const container = style([
  {
    '@layer': {
      [blocksLayer]: {
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
      },
    },
    width: 52,
    height: 32,
    backgroundColor: vars.color.textLight,
    vars: {
      [activeScale]: '1',
    },
    ':active': {
      vars: {
        [activeScale]: '0.96',
      },
    },
    selectors: {
      '&:has(input:checked)': {
        backgroundColor: vars.color.secondary,
      },
    },
  },
  atoms({
    // backgroundColor: 'secondary',
    borderRadius: 'xlarge',
  }),
  focusable,
]);

export const slider = style([
  {
    width: 24,
    height: 24,
    top: 4,
    left: 4,
    transform: `translateX(0) scale(${activeScale})`,
    selectors: {
      'input:checked ~ &': {
        transform: `translateX(20px) scale(${activeScale})`,
      },
    },
    '@media': {
      '(prefers-reduced-motion: no-preference)': {
        transition: 'transform 120ms ease-out',
      },
    },
  },
  atoms({
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 'xlarge',
  }),
]);

export const input = style({
  '@layer': {
    [blocksLayer]: {
      opacity: 0,
      maxHeight: 0,
      maxWidth: 0,
    },
  },
});
