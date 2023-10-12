import { style } from '@vanilla-extract/css';
import { atoms } from '../../../lib/css/atoms';
import { makeComponentTheme } from '../../../lib/theme/makeComponentTheme';
import { vars } from '../../../lib/theme/vars.css';
import { focusable } from './helpers.css';
import { bounceOut } from './transitions';

export const checkbox = makeComponentTheme('checkbox', {
  base: style([
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 24,
      height: 24,
      transition: `transform ${vars.transition.fast}`,
      transitionProperty: 'background-color',
      ':hover': {
        backgroundColor: vars.color.primaryDark,
      },
      selectors: {
        '&:has(input:checked):not(:hover)': {
          backgroundColor: vars.color.primary,
        },
      },
    },
    atoms({
      backgroundColor: 'primaryLight',
      borderRadius: 'small',
    }),
    focusable,
  ]),
  icon: style({
    height: 12,
    width: 12,
    backgroundColor: 'white',
    borderRadius: '8px',
    transform: 'scale(0)',
    transition: `transform ${vars.transition.normal} ${bounceOut}`,
    selectors: {
      'input:checked ~ &': {
        transform: 'scale(1)',
      },
    },
  }),
  label: atoms({
    display: 'flex',
    flexDirection: 'row',
    padding: 'xsmall',
    gap: 'medium',
    cursor: 'pointer',
  }),
});
