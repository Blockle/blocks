import {
  layers,
  makeComponentTheme,
  type ThemeComponentsStyles,
  tabIndicatorVars,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import { focusable } from './helpers.css.js';

// Only the look: Blocks' base styles lay out and scroll the row, and position,
// move and fall back the Tab indicator

const list = style({
  '@layer': {
    [layers.theme]: {
      // The thin baseline under the whole row
      boxShadow: `inset 0 -1px 0 ${vars.colorRole.border.default}`,
      vars: {
        [tabIndicatorVars.color]: vars.colorRole.primary.solid,
        [tabIndicatorVars.thickness]: '2px',
        [tabIndicatorVars.duration]: '200ms',
        [tabIndicatorVars.easing]: 'ease-in-out',
      },
    },
  },
});

const tab = style({
  '@layer': {
    [layers.theme]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
});

const trigger = style([
  focusable,
  {
    '@layer': {
      [layers.theme]: {
        paddingBlock: vars.space[2],
        paddingInline: vars.space[3],
        border: 'none',
        background: 'transparent',
        color: vars.colorRole.text.muted,
        font: 'inherit',
        fontSize: 'inherit',
        fontWeight: 500,
        textDecoration: 'none',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        selectors: {
          '&:hover': {
            color: vars.colorRole.text.default,
          },
          '&[aria-selected="true"], &[aria-current="page"]': {
            color: vars.colorRole.text.default,
            fontWeight: 600,
          },
        },
      },
    },
  },
]);

// Slot content sits in line with the label; the trigger's own padding provides
// the gap on the label side
const slot = style({
  '@layer': {
    [layers.theme]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
});

const startSlot = style([
  slot,
  {
    '@layer': {
      [layers.theme]: { paddingInlineStart: vars.space[3] },
    },
  },
]);
const endSlot = style([
  slot,
  {
    '@layer': {
      [layers.theme]: { paddingInlineEnd: vars.space[2] },
    },
  },
]);

const panel = style({
  '@layer': {
    [layers.theme]: {
      ':focus-visible': {
        outline: `2px solid ${vars.colorRole.focusRing.color}`,
        outlineOffset: '2px',
      },
    },
  },
});

export const tabs: ThemeComponentsStyles['tabs'] = makeComponentTheme('tabs', {
  list,
  tab,
  trigger,
  startSlot,
  endSlot,
  panel,
});
