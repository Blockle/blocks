import {
  atoms,
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
  // The thin baseline under the whole row
  boxShadow: `inset 0 -1px 0 ${vars.colorRole.border.default}`,
  vars: {
    [tabIndicatorVars.color]: vars.colorRole.primary.solid,
    [tabIndicatorVars.thickness]: '2px',
    [tabIndicatorVars.duration]: '200ms',
    [tabIndicatorVars.easing]: 'ease-in-out',
  },
});

const tab = style({
  display: 'flex',
  alignItems: 'center',
});

const trigger = style([
  focusable,
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
