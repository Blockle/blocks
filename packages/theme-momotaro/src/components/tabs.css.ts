import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import { focusable } from './helpers.css.js';

// A tab is selected (Tabs) or current (TabNav) when its activation element
// says so
const selected = '> [aria-selected="true"], > [aria-current="page"]';

const list = style([
  atoms({ display: 'flex' }),
  {
    // The thin baseline under the whole row
    boxShadow: `inset 0 -1px 0 ${vars.colorRole.border.default}`,
  },
]);

const tab = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  selectors: {
    // Static bar under the selected tab. The moving Tab indicator replaces it
    // where CSS anchor positioning is supported.
    [`&:has(${selected})::after`]: {
      content: '""',
      position: 'absolute',
      insetInline: 0,
      insetBlockEnd: 0,
      blockSize: '2px',
      backgroundColor: vars.colorRole.primary.solid,
    },
  },
});

const trigger = style([
  atoms({ paddingBlock: 2, paddingInline: 3, fontSize: 'small' }),
  {
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
  focusable,
]);

// Slot content sits in line with the label; the trigger's own padding provides
// the gap on the label side
const slot = style({
  display: 'flex',
  alignItems: 'center',
});

const startSlot = style([slot, atoms({ paddingInlineStart: 3 })]);
const endSlot = style([slot, atoms({ paddingInlineEnd: 2 })]);

const panel = style({
  ':focus-visible': {
    outline: `2px solid ${vars.colorRole.focusRing.color}`,
    outlineOffset: '2px',
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
