import { layers, tabIndicatorVars } from '@blockle/blocks-core';
import { globalStyle, style } from '@vanilla-extract/css';

// The base styles: what Tabs and TabNav need to work under any theme. They
// lay out and scroll the row, position and move the Tab indicator, and draw a
// static bar where anchor positioning is unsupported. A `tabs` Component
// theme only adds the look, and sets the Tab indicator's through
// `tabIndicatorVars` on `list`.

// A tab is selected (Tabs) or current (TabNav) when its activation element
// carries one of these
const selectedTrigger = '[aria-selected="true"], [aria-current="page"]';

// The tab wrapper's child that is selected or current
const selected = '> :is([aria-selected="true"], [aria-current="page"])';

// The anchor name the selected tab offers the Tab indicator
const anchorName = '--blockle-tab';

// Needs both properties: a browser with anchor-name but without anchor-scope
// would let two lists share one anchor, so it gets the static bar instead
const anchorPositioning = '(anchor-name: --a) and (anchor-scope: --a)';

// CSS anchor positioning isn't in csstype yet, so these declarations are
// typed loosely
const anchorCss = (properties: Record<string, string | number>) =>
  properties as Record<string, never>;

export const list = style({
  '@layer': {
    [layers.molecule]: {
      // The Tab indicator is positioned against this box
      position: 'relative',
      display: 'flex',
      // One row that scrolls sideways, never wraps. The Tab indicator is a
      // child, so it scrolls with the tabs.
      overflowX: 'auto',
      '@supports': {
        // Keeps another tab list's selected tab from anchoring this list's
        // Tab indicator
        [anchorPositioning]: anchorCss({ anchorScope: anchorName }),
      },
    },
  },
});

// The list inside a TabNav: the nav is the scrolling row, so the list only
// lays the tabs out in a line without shrinking them
export const navList = style({
  '@layer': {
    [layers.molecule]: {
      display: 'flex',
      flexShrink: 0,
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
  },
});

// The Tab indicator: one bar per list. It takes the left edge and width of the
// selected tab's wrapper, and both transition. Where anchor positioning is
// unsupported it isn't shown, and the selected tab draws a static bar instead
// (see `tab`).
export const indicator = style({
  '@layer': {
    [layers.molecule]: {
      display: 'none',
      '@supports': {
        [anchorPositioning]: anchorCss({
          display: 'block',
          position: 'absolute',
          positionAnchor: anchorName,
          left: `anchor(${anchorName} left)`,
          width: `anchor-size(${anchorName} width)`,
          bottom: 0,
          height: tabIndicatorVars.thickness,
          backgroundColor: tabIndicatorVars.color,
          pointerEvents: 'none',
        }),
      },
      // Moves only for users who haven't asked for less motion
      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          transitionProperty: 'left, width',
          transitionDuration: tabIndicatorVars.duration,
          transitionTimingFunction: tabIndicatorVars.easing,
        },
      },
      selectors: {
        // Nothing selected, nothing to point at
        [`${list}:not(:has(${selectedTrigger})) > &`]: {
          display: 'none',
        },
      },
    },
  },
});

export const tab = style({
  '@layer': {
    [layers.molecule]: {
      position: 'relative',
      flexShrink: 0,
      selectors: {
        // Static bar under the selected tab. Without anchor positioning it is
        // the only mark; the moving Tab indicator replaces it everywhere else.
        [`&:has(${selected})::after`]: {
          content: '""',
          position: 'absolute',
          insetInline: 0,
          insetBlockEnd: 0,
          blockSize: tabIndicatorVars.thickness,
          backgroundColor: tabIndicatorVars.color,
        },
      },
      '@supports': {
        [anchorPositioning]: {
          selectors: {
            [`&:has(${selected})`]: anchorCss({ anchorName }),
            [`&:has(${selected})::after`]: { content: 'none' },
          },
        },
      },
    },
  },
});

// The list scrolls, which clips a focus ring drawn outside a tab, so the ring
// is drawn inside. `!important` because a theme's ring, such as momotaro's
// `focusable`, sets its own offset and themes sit above these base styles; the
// theme still owns the ring's colour and width.
const insetRing = { outlineOffset: '-2px !important' };

export const trigger = style({
  '@layer': {
    [layers.molecule]: {
      ':focus-visible': insetRing,
    },
  },
});

// Wraps a tab's startSlot or endSlot content. Empty on purpose: it is the hook
// for the inset ring below.
export const slot = style({});

// The same for a focusable Slot control, such as a close IconButton
globalStyle(`${slot} :is(button, a, [tabindex]):focus-visible`, {
  '@layer': {
    [layers.molecule]: insetRing,
  },
});
