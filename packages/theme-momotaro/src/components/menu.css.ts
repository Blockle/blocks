import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import { focusable } from './helpers.css.js';

const hoverBackground = `color-mix(in srgb, ${vars.colorRole.text.default} 10%, transparent)`;

export const menu: ThemeComponentsStyles['menu'] = makeComponentTheme('menu', {
  // Sits on the popover surface (background, shadow, radius)
  list: style([
    atoms({ padding: 1 }),
    {
      minWidth: '10rem',
      // A long list scrolls instead of running off the screen
      maxHeight: 'calc(100dvh - 1rem)',
      overflowY: 'auto',
      overscrollBehavior: 'contain',
    },
  ]),
  item: style([
    atoms({
      borderRadius: 1,
      paddingBlock: 1,
      paddingInline: 2,
    }),
    {
      display: 'flex',
      alignItems: 'center',
      gap: vars.space[2],
      width: '100%',
      border: 'none',
      background: 'transparent',
      color: 'inherit',
      font: 'inherit',
      textAlign: 'start',
      cursor: 'pointer',
      selectors: {
        '&:hover, &:focus': {
          backgroundColor: hoverBackground,
        },
      },
    },
    focusable,
  ]),
  separator: style({
    border: 'none',
    height: 1,
    marginBlock: vars.space[1],
    backgroundColor: `color-mix(in srgb, ${vars.colorRole.text.default} 15%, transparent)`,
  }),
});
