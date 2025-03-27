import { makeComponentTheme, sprinkles, vars } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';
import { focusable } from './helpers.css';
import { bounceOut } from './transitions';

export const radio = makeComponentTheme('radio', {
  base: style([
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      inlineSize: 24,
      blockSize: 24,
      borderRadius: 12,
      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          transition: `background-color ${vars.transition.fast}, box-shadow ${vars.transition.fast}`,
        },
      },
      ':hover': {
        backgroundColor: vars.color.primaryDark,
      },
      selectors: {
        '&:has(input:checked):not(:hover)': {
          backgroundColor: vars.color.primary,
        },
      },
    },
    sprinkles({
      backgroundColor: 'primaryLight',
    }),
    focusable,
  ]),
  icon: style({
    height: 12,
    width: 12,
    backgroundColor: 'white',
    borderRadius: '8px',
    transform: 'scale(0)',
    '@media': {
      '(prefers-reduced-motion: no-preference)': {
        transition: `transform ${vars.transition.normal} ${bounceOut}`,
      },
    },
    selectors: {
      'input:checked ~ &': {
        transform: 'scale(1)',
      },
    },
  }),
  label: sprinkles({
    display: 'flex',
    flexDirection: 'row',
    padding: 'xsmall',
    gap: 'medium',
    cursor: 'pointer',
  }),
});
