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
      inlineSize: 24,
      blockSize: 24,
      transition: `background-color ${vars.transition.normal}, box-shadow ${vars.transition.fast}`,
      selectors: {
        '&:hover:not(:has(input:disabled))': {
          backgroundColor: vars.color.primaryDark,
        },
        '&:has(input:checked)': {
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
    inlineSize: '1rem',
    blockSize: '1rem',
    color: 'white',
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
