import { describe, expect, it } from 'vitest';

import { computePopoverPosition } from './popover-utils.js';

// A 32x32 anchor in the middle of a 1000x800 viewport, a 100x50 popover
// with a 4px margin on every side
const base = {
  anchor: { top: 400, left: 500, width: 32, height: 32 },
  popover: {
    width: 100,
    height: 50,
    margin: { top: 4, right: 4, bottom: 4, left: 4 },
  },
  viewport: { width: 1000, height: 800, scrollX: 0, scrollY: 0 },
};

describe('computePopoverPosition', () => {
  it('centres a bare side on the anchor', () => {
    // Border box: left = 500 + (32 - 100) / 2 = 466, top = 432 + 4 = 436
    expect(computePopoverPosition({ ...base, placement: 'bottom' })).toEqual([
      462, 432,
    ]);
  });

  it.each([
    // Border box left 500 (anchor's left edge), top 432 + 4 = 436
    ['bottom-start', [496, 432]],
    // Border box left 532 - 100 = 432 (anchor's right edge)
    ['bottom-end', [428, 432]],
    // Border box top 400 - 4 - 50 = 346
    ['top', [462, 342]],
    ['top-start', [496, 342]],
    ['top-end', [428, 342]],
    // Border box left 532 + 4 = 536; top 400 + (32 - 50) / 2 = 391
    ['right', [532, 387]],
    // Border box top 400 (anchor's top edge)
    ['right-start', [532, 396]],
    // Border box top 432 - 50 = 382 (anchor's bottom edge)
    ['right-end', [532, 378]],
    // Border box left 500 - 4 - 100 = 396
    ['left', [392, 387]],
    ['left-start', [392, 396]],
    ['left-end', [392, 378]],
  ] as const)('places %s against the anchor', (placement, expected) => {
    expect(computePopoverPosition({ ...base, placement })).toEqual(expected);
  });

  describe('flipping', () => {
    it('flips top-start to bottom-start without room above', () => {
      const anchor = { ...base.anchor, top: 20 };

      // Border box left 500, top 52 + 4 = 56
      expect(
        computePopoverPosition({ ...base, anchor, placement: 'top-start' }),
      ).toEqual([496, 52]);
    });

    it('flips bottom-end to top-end without room below', () => {
      const anchor = { ...base.anchor, top: 760 };

      // Border box left 432, top 760 - 4 - 50 = 706
      expect(
        computePopoverPosition({ ...base, anchor, placement: 'bottom-end' }),
      ).toEqual([428, 702]);
    });

    it('flips right to left without room on the right', () => {
      const anchor = { ...base.anchor, left: 920 };

      // Border box left 920 - 4 - 100 = 816
      expect(
        computePopoverPosition({ ...base, anchor, placement: 'right' }),
      ).toEqual([812, 387]);
    });

    it('flips left to right without room on the left', () => {
      const anchor = { ...base.anchor, left: 20 };

      // Border box left 52 + 4 = 56
      expect(
        computePopoverPosition({ ...base, anchor, placement: 'left' }),
      ).toEqual([52, 387]);
    });

    it('keeps the side when the other side has even less room', () => {
      const viewport = { ...base.viewport, height: 100 };
      const anchor = { ...base.anchor, top: 40 };

      // 40px above, 28px below: stays on top, border box top 40 - 4 - 50
      expect(
        computePopoverPosition({ ...base, anchor, viewport, placement: 'top' }),
      ).toEqual([462, -18]);
    });
  });

  describe('keeping the popover inside the viewport', () => {
    it('shifts a centred popover away from the left edge', () => {
      // The ticket's repro: a 350px popover under a 32px anchor at x = 70
      const anchor = { ...base.anchor, left: 70 };
      const popover = { ...base.popover, width: 350 };

      // Centred border box left would be 70 - 159 = -89; shifted to 8
      expect(
        computePopoverPosition({
          ...base,
          anchor,
          popover,
          placement: 'bottom',
        }),
      ).toEqual([4, 432]);
    });

    it('shifts a right-side popover away from the top edge', () => {
      const anchor = { ...base.anchor, top: 10 };

      // Centred border box top would be 10 - 9 = 1; shifted to 8
      expect(
        computePopoverPosition({ ...base, anchor, placement: 'right' }),
      ).toEqual([532, 4]);
    });

    it('overrides -end near the start edge', () => {
      const anchor = { ...base.anchor, left: 20 };

      // End-aligned border box left would be 52 - 100 = -48
      expect(
        computePopoverPosition({ ...base, anchor, placement: 'bottom-end' }),
      ).toEqual([4, 432]);
    });

    it('overrides -start near the end edge', () => {
      const anchor = { ...base.anchor, left: 950 };

      // Border box left 1000 - 8 - 100 = 892
      expect(
        computePopoverPosition({ ...base, anchor, placement: 'top-start' }),
      ).toEqual([888, 342]);
    });

    it('places a popover wider than the viewport 8px from its start edge', () => {
      const popover = { ...base.popover, width: 1200 };

      expect(
        computePopoverPosition({ ...base, popover, placement: 'bottom-end' }),
      ).toEqual([4, 432]);
    });

    it('accounts for the scroll position', () => {
      const anchor = { ...base.anchor, left: 70 };
      const popover = { ...base.popover, width: 350 };
      const viewport = { ...base.viewport, scrollX: 200, scrollY: 300 };

      expect(
        computePopoverPosition({
          ...base,
          anchor,
          popover,
          viewport,
          placement: 'bottom',
        }),
      ).toEqual([204, 732]);
    });
  });
});
