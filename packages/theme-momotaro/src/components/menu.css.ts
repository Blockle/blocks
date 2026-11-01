import {
  layers,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { globalStyle, style } from '@vanilla-extract/css';

import { focusable } from './helpers.css.js';

const hoverBackground = `color-mix(in srgb, ${vars.colorRole.text.default} 10%, transparent)`;

const itemIndicator = style({
  '@layer': {
    [layers.theme]: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: '1em',
      height: '1em',
    },
  },
});

globalStyle(`${itemIndicator} > svg`, {
  '@layer': {
    [layers.theme]: { width: '100%', height: '100%' },
  },
});

export const menu: ThemeComponentsStyles['menu'] = makeComponentTheme('menu', {
  // Sits on the popover surface (background, shadow, radius)
  list: style({
    '@layer': {
      [layers.theme]: {
        minWidth: '10rem',
        // Popover caps a long list at the viewport's edge; the list scrolls
        overflowY: 'auto',
        overscrollBehavior: 'contain',
      },
    },
  }),
  item: style([
    {
      '@layer': {
        [layers.theme]: {
          borderRadius: vars.borderRadius[1],
          paddingBlock: vars.space[1],
          paddingInline: vars.space[2],
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
            '&:hover:not([aria-disabled="true"]), &:focus:not([aria-disabled="true"])':
              {
                backgroundColor: hoverBackground,
              },
            '&[aria-disabled="true"]': {
              cursor: 'default',
              color: vars.colorRole.text.disabled,
            },
          },
        },
      },
    },
    focusable,
  ]),
  // Holds the check; unchecked items keep the space so labels line up
  itemIndicator,
  separator: style({
    '@layer': {
      [layers.theme]: {
        border: 'none',
        height: 1,
        marginBlock: vars.space[1],
        backgroundColor: `color-mix(in srgb, ${vars.colorRole.text.default} 15%, transparent)`,
      },
    },
  }),
});
