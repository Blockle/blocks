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

describe('Popover closing (browser)', () => {
  const Closing: React.FC<{ open: boolean }> = ({ open }) => {
    const anchorRef = useRef<HTMLDivElement>(null);

    return (
      <>
        <div ref={anchorRef} style={{ position: 'fixed', top: 100, left: 100 }}>
          Anchor
        </div>
        <Popover
          open={open}
          anchorElement={anchorRef}
          onRequestClose={vi.fn()}
          data-testid="popover"
        >
          <span data-testid="child">Content</span>
        </Popover>
      </>
    );
  };

  const getPopover = () =>
    document.querySelector<HTMLElement>('[data-testid="popover"]');

  const openSettled = async () => {
    const screen = await render(<Closing open />);

    // The opening transition starts a few frames after the render
    await vi.waitFor(() => {
      const popover = getPopover();

      expect(popover?.matches(':popover-open')).toBe(true);
      expect(popover?.getAnimations()).toHaveLength(0);
      expect(getComputedStyle(popover as HTMLElement).opacity).toBe('1');
    });

    return screen;
  };

  it('unmounts after its closing transition', async () => {
    const screen = await openSettled();

    await screen.rerender(<Closing open={false} />);

    await vi.waitFor(() => expect(getPopover()).toBeNull());
  });

  it('unmounts when its closing transition is cancelled', async () => {
    const screen = await openSettled();

    const popover = getPopover() as HTMLElement;
    // Long enough that the closing transition is still running when dropped
    popover.style.setProperty('transition-duration', '10s');
    const running = new Promise((resolve) =>
      popover.addEventListener('transitionrun', resolve, { once: true }),
    );

    await screen.rerender(<Closing open={false} />);
    await running;
    // Dropping the transition cancels the one running, so no transitionend
    popover.style.setProperty('transition', 'none');

    await vi.waitFor(() => expect(getPopover()).toBeNull());
  });

  it("stays mounted until its own closing transition ends, not a child's", async () => {
    const screen = await openSettled();

    await screen.rerender(<Closing open={false} />);
    document
      .querySelector('[data-testid="child"]')
      ?.dispatchEvent(new TransitionEvent('transitionend', { bubbles: true }));
    // Let React commit, well within the popover's 100ms closing transition
    await new Promise(requestAnimationFrame);

    expect(getPopover()).not.toBeNull();
    await vi.waitFor(() => expect(getPopover()).toBeNull());
  });
});

describe('Popover live layout (browser)', () => {
  type LiveProps = Pick<PopoverProps, 'placement' | 'limitHeight'> & {
    inPanel?: boolean;
    open?: boolean;
    grow?: boolean;
  };

  const Live: React.FC<LiveProps> = ({
    inPanel = false,
    open = true,
    grow = false,
    ...props
  }) => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const anchor = (
      <div
        ref={anchorRef}
        data-testid="anchor"
        style={{
          position: inPanel ? 'absolute' : 'fixed',
          top: 150,
          left: 100,
          width: 32,
          height: 32,
        }}
      />
    );

    return (
      <>
        {inPanel ? (
          <div
            data-testid="panel"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: 300,
              height: 300,
              overflow: 'auto',
            }}
          >
            <div style={{ position: 'relative', height: 900 }}>{anchor}</div>
          </div>
        ) : (
          anchor
        )}
        <Popover
          {...props}
          open={open}
          anchorElement={anchorRef}
          onRequestClose={vi.fn()}
          data-testid="popover"
          style={{ width: 100, overflow: 'auto', boxSizing: 'border-box' }}
        >
          <div data-testid="content" style={{ height: grow ? 110 : 50 }} />
        </Popover>
      </>
    );
  };

  const getPopover = () =>
    document.querySelector<HTMLElement>(
      '[data-testid="popover"]',
    ) as HTMLElement;
  const getAnchor = () =>
    document.querySelector<HTMLElement>(
      '[data-testid="anchor"]',
    ) as HTMLElement;
  const nextFrame = () => new Promise(requestAnimationFrame);

  // The opening transition runs a few frames after render and Popover's
  // click outside listener attaches a frame after opening
  const settleOpen = () =>
    vi.waitFor(() => {
      const popover = getPopover();

      expect(popover?.matches(':popover-open')).toBe(true);
      expect(popover?.getAnimations()).toHaveLength(0);
      expect(getComputedStyle(popover).opacity).toBe('1');
    });

  const renderLive = async (props: LiveProps = {}) => {
    const screen = await render(<Live {...props} />);

    await settleOpen();

    return screen;
  };

  // The popover sits a few pixels off the anchor, a stale layout is further
  const expectGap = (a: number, b: number) =>
    expect(Math.abs(a - b)).toBeLessThanOrEqual(8);

  const popoverRect = () => getPopover().getBoundingClientRect();
  const anchorRect = () => getAnchor().getBoundingClientRect();

  it('follows its anchor when the window is resized', async () => {
    await renderLive({ placement: 'bottom-start' });

    getAnchor().style.top = '200px';
    window.dispatchEvent(new Event('resize'));

    await vi.waitFor(() => expectGap(popoverRect().top, anchorRect().bottom));
  });

  it('follows its anchor when a panel containing it scrolls', async () => {
    await renderLive({ placement: 'bottom-start', inPanel: true });

    const before = popoverRect().top;

    (document.querySelector('[data-testid="panel"]') as HTMLElement).scrollTop =
      60;

    await vi.waitFor(() =>
      expect(popoverRect().top).toBeCloseTo(before - 60, 0),
    );
    expectGap(popoverRect().top, anchorRect().bottom);
  });

  it('follows its anchor when the visual viewport resizes', async () => {
    await renderLive({ placement: 'bottom-start' });

    getAnchor().style.top = '200px';
    window.visualViewport?.dispatchEvent(new Event('resize'));

    await vi.waitFor(() => expectGap(popoverRect().top, anchorRect().bottom));
  });

  it('keeps its edge on the anchor when its content grows', async () => {
    const screen = await renderLive({ placement: 'top-start' });

    expectGap(popoverRect().bottom, anchorRect().top);

    await screen.rerender(<Live placement="top-start" grow />);

    await vi.waitFor(() => {
      expect(popoverRect().height).toBeGreaterThan(90);
      expectGap(popoverRect().bottom, anchorRect().top);
    });
  });

  it('keeps its edge on the anchor when the anchor changes size', async () => {
    await renderLive({ placement: 'bottom-start' });

    getAnchor().style.height = '80px';

    await vi.waitFor(() => expectGap(popoverRect().top, anchorRect().bottom));
  });

  it('flips above the anchor when it moves near the bottom edge', async () => {
    await renderLive({ placement: 'bottom-start' });

    expect(popoverRect().top).toBeGreaterThanOrEqual(anchorRect().bottom);

    getAnchor().style.top = `${document.documentElement.clientHeight - 40}px`;
    window.dispatchEvent(new Event('resize'));

    await vi.waitFor(() => expectGap(popoverRect().bottom, anchorRect().top));
  });

  it('updates its height cap when the anchor moves', async () => {
    await renderLive({ placement: 'bottom-start', limitHeight: true });

    const viewportHeight = document.documentElement.clientHeight;

    (
      document.querySelector('[data-testid="content"]') as HTMLElement
    ).style.height = '3000px';

    // Capped to the room below the anchor
    await vi.waitFor(() => {
      expectGap(popoverRect().top, anchorRect().bottom);
      expect(popoverRect().bottom).toBeCloseTo(viewportHeight - 8, 0);
    });

    getAnchor().style.top = `${viewportHeight - 100}px`;
    window.dispatchEvent(new Event('resize'));

    // Flips above and is capped to the room there
    await vi.waitFor(() => {
      expectGap(popoverRect().bottom, anchorRect().top);
      expect(popoverRect().top).toBeCloseTo(8, 0);
    });
  });

  it('batches updates to one per animation frame', async () => {
    await renderLive({ placement: 'bottom-start' });
    await nextFrame();
    await nextFrame();

    const spy = vi.spyOn(getAnchor(), 'getBoundingClientRect');

    for (let index = 0; index < 5; index++) {
      window.dispatchEvent(new Event('resize'));
      document.dispatchEvent(new Event('scroll'));
    }

    await nextFrame();
    await nextFrame();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('settles when a height cap resizes the popover', async () => {
    await renderLive({ placement: 'bottom-start', limitHeight: true });

    window.dispatchEvent(new Event('resize'));
    await nextFrame();
    await nextFrame();

    const cap = getPopover().style.maxHeight;
    const spy = vi.spyOn(getAnchor(), 'getBoundingClientRect');

    for (let index = 0; index < 10; index++) {
      await nextFrame();
    }

    expect(spy).not.toHaveBeenCalled();
    expect(getPopover().style.maxHeight).toBe(cap);
  });

  it('removes its listeners when it closes', async () => {
    const counts = { added: 0, removed: 0 };
    const watched = new Set(['resize', 'scroll']);

    const targets: (EventTarget | null)[] = [
      window,
      document,
      window.visualViewport,
    ];

    for (const target of targets) {
      if (!target) {
        continue;
      }

      const add = target.addEventListener.bind(target);
      const remove = target.removeEventListener.bind(target);

      vi.spyOn(target, 'addEventListener').mockImplementation(
        (...args: Parameters<typeof add>) => {
          if (watched.has(args[0])) {
            counts.added++;
          }

          return add(...args);
        },
      );
      vi.spyOn(target, 'removeEventListener').mockImplementation(
        (...args: Parameters<typeof remove>) => {
          if (watched.has(args[0])) {
            counts.removed++;
          }

          return remove(...args);
        },
      );
    }

    const screen = await renderLive({ placement: 'bottom-start' });

    expect(counts.added).toBeGreaterThanOrEqual(3);

    await screen.rerender(<Live placement="bottom-start" open={false} />);
    await vi.waitFor(() => expect(counts.removed).toBe(counts.added));

    vi.restoreAllMocks();
  });
});
