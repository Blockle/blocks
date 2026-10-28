import { useRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { render } from '../../../testUtils/browser/render.js';
import { Popover, type PopoverProps } from './Popover.js';

type FixtureProps = {
  /** The anchor's border box, relative to the viewport */
  anchor: { top: number; left: number; width?: number; height?: number };
  size: { width: number; height: number };
} & Pick<PopoverProps, 'placement' | 'position'>;

const Fixture: React.FC<FixtureProps> = ({ anchor, size, ...props }) => {
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={anchorRef}
        data-testid="anchor"
        style={{
          position: 'fixed',
          top: anchor.top,
          left: anchor.left,
          width: anchor.width ?? 32,
          height: anchor.height ?? 32,
        }}
      />
      <Popover
        {...props}
        open
        anchorElement={anchorRef}
        onRequestClose={vi.fn()}
        data-testid="popover"
        style={{ ...size, boxSizing: 'border-box' }}
      >
        Content
      </Popover>
    </>
  );
};

// Waits for the opening transition, which scales the popover
async function settledRect(element: Element) {
  await Promise.all(element.getAnimations().map((a) => a.finished));

  return element.getBoundingClientRect();
}

async function renderFixture(props: FixtureProps) {
  const screen = await render(<Fixture {...props} />);
  const anchor = screen.getByTestId('anchor').element().getBoundingClientRect();
  const popover = await settledRect(screen.getByTestId('popover').element());

  return { anchor, popover };
}

describe('Popover placement (browser)', () => {
  it('keeps a wide popover under an anchor near the left edge on screen', async () => {
    const { popover } = await renderFixture({
      anchor: { top: 100, left: 70 },
      size: { width: 350, height: 50 },
      placement: 'bottom',
    });

    expect(popover.left).toBeGreaterThanOrEqual(8);
  });

  it('keeps a popover beside an anchor near the top edge on screen', async () => {
    const { popover } = await renderFixture({
      anchor: { top: 10, left: 100 },
      size: { width: 100, height: 100 },
      placement: 'right',
    });

    expect(popover.top).toBeGreaterThanOrEqual(8);
  });

  it.each([
    ['bottom-start', 'left', 'left'],
    ['bottom-end', 'right', 'right'],
    ['left-start', 'top', 'top'],
    ['left-end', 'bottom', 'bottom'],
  ] as const)('lines %s up with the anchor', async (placement, popoverEdge, anchorEdge) => {
    const { anchor, popover } = await renderFixture({
      anchor: { top: 300, left: 200, width: 120, height: 80 },
      size: { width: 100, height: 50 },
      placement,
    });

    expect(popover[popoverEdge]).toBeCloseTo(anchor[anchorEdge], 0);
  });

  it('centres a bare side on the anchor', async () => {
    const { anchor, popover } = await renderFixture({
      anchor: { top: 300, left: 200, width: 120, height: 80 },
      size: { width: 100, height: 50 },
      placement: 'top',
    });

    expect(popover.left + popover.width / 2).toBeCloseTo(
      anchor.left + anchor.width / 2,
      0,
    );
    expect(popover.bottom).toBeLessThanOrEqual(anchor.top);
  });

  it('flips top-start to bottom-start without room above', async () => {
    const { anchor, popover } = await renderFixture({
      anchor: { top: 20, left: 200 },
      size: { width: 100, height: 50 },
      placement: 'top-start',
    });

    expect(popover.top).toBeGreaterThanOrEqual(anchor.bottom);
    expect(popover.left).toBeCloseTo(anchor.left, 0);
  });

  it('still takes the deprecated position prop', async () => {
    const { anchor, popover } = await renderFixture({
      anchor: { top: 300, left: 200 },
      size: { width: 100, height: 50 },
      position: 'bottom',
    });

    expect(popover.top).toBeGreaterThanOrEqual(anchor.bottom);
  });

  it('prefers placement over position', async () => {
    const { anchor, popover } = await renderFixture({
      anchor: { top: 300, left: 200 },
      size: { width: 100, height: 50 },
      position: 'bottom',
      placement: 'top',
    });

    expect(popover.bottom).toBeLessThanOrEqual(anchor.top);
  });
});
