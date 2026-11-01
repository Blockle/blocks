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

// The anchor the selected tab offers the Tab indicator
const anchor = '--blockle-tab';

// CSS anchor positioning isn't in csstype yet, so these declarations are
// typed loosely
const declarations = (properties: Record<string, string | number>) =>
  properties as Record<string, never>;

const list = style([
  atoms({ display: 'flex' }),
  {
    // The Tab indicator is positioned against this box
    position: 'relative',
    // One row that scrolls sideways, never wraps. The Tab indicator is a
    // child, so it scrolls with the tabs.
    overflowX: 'auto',
    // The thin baseline under the whole row
    boxShadow: `inset 0 -1px 0 ${vars.colorRole.border.default}`,
    '@supports': {
      '(anchor-name: --a)': declarations({
        // Keeps another tab list's selected tab from anchoring this
        // list's Tab indicator
        anchorScope: anchor,
      }),
    },
  },
]);

// The Tab indicator: one bar per list. It takes the left edge and width of the
// selected tab's wrapper, and both transition. Where anchor positioning is
// unsupported it isn't shown, and the selected tab draws a static bar instead
// (see `tab`).
const indicator = style({
  display: 'none',
  '@supports': {
    '(anchor-name: --a)': declarations({
      display: 'block',
      position: 'absolute',
      positionAnchor: anchor,
      left: `anchor(${anchor} left)`,
      width: `anchor-size(${anchor} width)`,
      bottom: 0,
      height: '2px',
      backgroundColor: vars.colorRole.primary.solid,
      pointerEvents: 'none',
    }),
  },
  // Moves only for users who haven't asked for less motion
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transitionProperty: 'left, width',
      transitionDuration: '200ms',
      transitionTimingFunction: 'ease-in-out',
    },
  },
  selectors: {
    // Nothing selected, nothing to point at
    [`${list}:not(:has([aria-selected="true"], [aria-current="page"])) > &`]: {
      display: 'none',
    },
  },
});

const tab = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  selectors: {
    // Static bar under the selected tab. Without anchor positioning it is the
    // only mark; the moving Tab indicator replaces it everywhere else.
    [`&:has(${selected})::after`]: {
      content: '""',
      position: 'absolute',
      insetInline: 0,
      insetBlockEnd: 0,
      blockSize: '2px',
      backgroundColor: vars.colorRole.primary.solid,
    },
  },
  '@supports': {
    '(anchor-name: --a)': {
      selectors: {
        [`&:has(${selected})`]: declarations({ anchorName: anchor }),
        [`&:has(${selected})::after`]: { content: 'none' },
      },
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
  indicator,
  tab,
  trigger,
  startSlot,
  endSlot,
  panel,
});
