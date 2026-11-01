import { useRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';

import { render } from '../../../testUtils/browser/render.js';
import { Popover, type PopoverProps } from './Popover.js';

const queryByTestId = (id: string) =>
  document.querySelector<HTMLElement>(`[data-testid="${id}"]`);

const byTestId = (id: string) => queryByTestId(id) as HTMLElement;

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

  const getPopover = () => queryByTestId('popover');

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
    byTestId('child').dispatchEvent(
      new TransitionEvent('transitionend', { bubbles: true }),
    );
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
    /** Content far taller than any room there is */
    tall?: boolean;
    anchorTop?: number;
    boxSizing?: 'border-box' | 'content-box';
  };

  const Live: React.FC<LiveProps> = ({
    inPanel = false,
    open = true,
    grow = false,
    tall = false,
    anchorTop = 150,
    boxSizing = 'border-box',
    ...props
  }) => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const anchor = (
      <div
        ref={anchorRef}
        data-testid="anchor"
        style={{
          position: inPanel ? 'absolute' : 'fixed',
          top: anchorTop,
          left: 100,
          width: 32,
          height: 32,
        }}
      />
    );

    let contentHeight = 50;

    if (tall) {
      contentHeight = 3000;
    } else if (grow) {
      contentHeight = 110;
    }

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
          style={{ width: 100, overflow: 'auto', boxSizing }}
        >
          <div data-testid="content" style={{ height: contentHeight }} />
        </Popover>
      </>
    );
  };

  const getPopover = () => byTestId('popover');
  const getAnchor = () => byTestId('anchor');
  const nextFrame = () => new Promise(requestAnimationFrame);

  const nextFrames = async (count: number) => {
    for (let index = 0; index < count; index++) {
      await nextFrame();
    }
  };

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

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    ['below', 'bottom-start', 150],
    ['above', 'top-start', 700],
  ] as const)('caps a content-box popover %s its anchor, padding and border included', async (_, placement, anchorTop) => {
    await renderLive({
      placement,
      anchorTop,
      limitHeight: true,
      tall: true,
      boxSizing: 'content-box',
    });

    const popover = popoverRect();
    const anchor = anchorRect();
    const viewportHeight = document.documentElement.clientHeight;

    if (placement === 'bottom-start') {
      expect(popover.top).toBeGreaterThanOrEqual(anchor.bottom);
      expect(popover.bottom).toBeLessThanOrEqual(viewportHeight - 8 + 0.5);
    } else {
      expect(popover.top).toBeGreaterThanOrEqual(8 - 0.5);
      expect(popover.bottom).toBeLessThanOrEqual(anchor.top);
    }
  });

  it('follows its anchor when the window is resized', async () => {
    await renderLive({ placement: 'bottom-start' });

    getAnchor().style.top = '200px';
    window.dispatchEvent(new Event('resize'));

    await vi.waitFor(() => expectGap(popoverRect().top, anchorRect().bottom));
  });

  it('follows its anchor when a panel containing it scrolls', async () => {
    await renderLive({ placement: 'bottom-start', inPanel: true });

    const before = popoverRect().top;

    byTestId('panel').scrollTop = 60;

    await vi.waitFor(() =>
      expect(popoverRect().top).toBeCloseTo(before - 60, 0),
    );
    expectGap(popoverRect().top, anchorRect().bottom);
  });

  it('stays inside the viewport when its anchor scrolls out of view', async () => {
    await renderLive({ placement: 'bottom-start', inPanel: true });

    // The anchor ends up 450px above the viewport's top edge
    byTestId('panel').scrollTop = 600;

    await vi.waitFor(() => expect(anchorRect().bottom).toBeLessThan(0));
    await vi.waitFor(() => expect(popoverRect().top).toBeCloseTo(8, 0));
    expect(popoverRect().bottom).toBeLessThanOrEqual(
      document.documentElement.clientHeight - 8,
    );
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

    byTestId('content').style.height = '3000px';

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
    // Let the layout and any observer callback it triggers settle
    await nextFrames(3);

    const spy = vi.spyOn(getAnchor(), 'getBoundingClientRect');

    for (let index = 0; index < 5; index++) {
      window.dispatchEvent(new Event('resize'));
      document.dispatchEvent(new Event('scroll'));
    }

    // Frame callbacks run in the order they were requested, so the burst's
    // update has run once this frame's callback does
    await nextFrame();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('ignores scrolling inside the popover itself', async () => {
    await renderLive({ placement: 'bottom-start' });

    // Content is 50px tall, so a 30px popover scrolls
    getPopover().style.height = '30px';
    await nextFrames(3);

    const spy = vi.spyOn(getAnchor(), 'getBoundingClientRect');

    getPopover().scrollTop = 10;
    await vi.waitFor(() => expect(getPopover().scrollTop).toBe(10));
    await nextFrames(3);

    expect(spy).not.toHaveBeenCalled();
  });

  it('settles when a height cap resizes the popover', async () => {
    const viewportHeight = document.documentElement.clientHeight;

    await renderLive({
      placement: 'bottom-start',
      limitHeight: true,
      tall: true,
      anchorTop: viewportHeight - 100,
    });

    // The cap shrinks the 3000px of content to the room above the anchor
    await vi.waitFor(() => {
      expect(popoverRect().height).toBeLessThan(viewportHeight);
      expectGap(popoverRect().bottom, anchorRect().top);
    });
    await nextFrames(3);

    const cap = getPopover().style.maxHeight;
    const anchorSpy = vi.spyOn(getAnchor(), 'getBoundingClientRect');
    const popoverSpy = vi.spyOn(getPopover(), 'getBoundingClientRect');

    await nextFrames(10);

    expect(anchorSpy).not.toHaveBeenCalled();
    expect(popoverSpy).not.toHaveBeenCalled();
    expect(getPopover().style.maxHeight).toBe(cap);
  });

  describe('cleaning up', () => {
    type Listener = {
      target: EventTarget;
      type: string;
      listener: EventListenerOrEventListenerObject;
      capture: boolean;
    };

    type Screen = Awaited<ReturnType<typeof renderLive>>;

    const watched = new Set(['resize', 'scroll']);

    const isCapture = (
      options:
        | boolean
        | AddEventListenerOptions
        | EventListenerOptions
        | undefined,
    ) => (typeof options === 'object' ? !!options.capture : !!options);

    // Records the resize and scroll listeners added and removed
    const spyOnListeners = () => {
      const added: Listener[] = [];
      const removed: Listener[] = [];
      const targets = [window, document, window.visualViewport].filter(
        (target) => target !== null,
      );

      for (const target of targets) {
        const add: EventTarget['addEventListener'] =
          target.addEventListener.bind(target);
        const remove: EventTarget['removeEventListener'] =
          target.removeEventListener.bind(target);

        vi.spyOn(target, 'addEventListener').mockImplementation(
          (...args: Parameters<EventTarget['addEventListener']>) => {
            const [type, listener, options] = args;

            if (watched.has(type) && listener) {
              added.push({
                target,
                type,
                listener,
                capture: isCapture(options),
              });
            }

            return add(...args);
          },
        );
        vi.spyOn(target, 'removeEventListener').mockImplementation(
          (...args: Parameters<EventTarget['removeEventListener']>) => {
            const [type, listener, options] = args;

            if (watched.has(type) && listener) {
              removed.push({
                target,
                type,
                listener,
                capture: isCapture(options),
              });
            }

            return remove(...args);
          },
        );
      }

      return { added, removed };
    };

    const isRemoved = (entry: Listener, removed: Listener[]) =>
      removed.some(
        (other) =>
          other.target === entry.target &&
          other.type === entry.type &&
          other.listener === entry.listener &&
          other.capture === entry.capture,
      );

    it.each([
      [
        'closes',
        (screen: Screen) =>
          screen.rerender(<Live placement="bottom-start" open={false} />),
      ],
      ['unmounts', (screen: Screen) => screen.unmount()],
    ])('removes its listeners, cancels its pending frame and disconnects its observer when it %s', async (_name, leave) => {
      const { added, removed } = spyOnListeners();
      const disconnect = vi.spyOn(ResizeObserver.prototype, 'disconnect');
      const cancel = vi.spyOn(window, 'cancelAnimationFrame');

      const screen = await renderLive({ placement: 'bottom-start' });
      await nextFrames(3);

      expect(
        added.map(({ target, type, capture }) => [target, type, capture]),
      ).toEqual(
        expect.arrayContaining([
          [window, 'resize', false],
          [document, 'scroll', true],
          [window.visualViewport, 'resize', false],
        ]),
      );

      // Hold the next frame back, so an update is still pending on leaving
      const pendingFrame = 1000;
      let requested = 0;

      vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => {
        requested++;

        return pendingFrame;
      });
      window.dispatchEvent(new Event('resize'));
      expect(requested).toBe(1);

      await leave(screen);
      await vi.waitFor(() => expect(queryByTestId('popover')).toBeNull());

      for (const entry of added) {
        expect(isRemoved(entry, removed)).toBe(true);
      }

      expect(disconnect).toHaveBeenCalled();
      expect(cancel).toHaveBeenCalledWith(pendingFrame);
    });
  });
});

describe('Popover width cap (browser)', () => {
  const swatches = Array.from({ length: 20 }, (_, index) => `swatch-${index}`);

  type WideProps = { boxSizing: 'border-box' | 'content-box' };

  // Twenty 32px swatches that wrap: 640px wide on one row
  const Wide: React.FC<WideProps> = ({ boxSizing }) => {
    const anchorRef = useRef<HTMLDivElement>(null);

    return (
      <>
        <div
          ref={anchorRef}
          style={{
            position: 'fixed',
            top: 100,
            left: 184,
            width: 32,
            height: 32,
          }}
        />
        <Popover
          open
          placement="bottom"
          anchorElement={anchorRef}
          onRequestClose={vi.fn()}
          data-testid="popover"
          style={{ boxSizing, padding: 16, border: '4px solid' }}
        >
          <div
            data-testid="content"
            style={{ display: 'flex', flexWrap: 'wrap' }}
          >
            {swatches.map((swatch) => (
              <div
                key={swatch}
                style={{ width: 32, height: 32, flex: 'none' }}
              />
            ))}
          </div>
        </Popover>
      </>
    );
  };

  let initial = { width: 0, height: 0 };

  beforeEach(async () => {
    initial = { width: window.innerWidth, height: window.innerHeight };
    await page.viewport(400, 800);
  });

  afterEach(async () => {
    await page.viewport(initial.width, initial.height);
  });

  const popoverRect = () => byTestId('popover').getBoundingClientRect();

  // The opening transition scales the popover
  const settled = () =>
    vi.waitFor(() => {
      expect(byTestId('popover').getAnimations()).toHaveLength(0);
    });

  it.each([
    'border-box',
    'content-box',
  ] as const)('keeps a %s popover wider than the viewport 8px inside both edges', async (boxSizing) => {
    await render(<Wide boxSizing={boxSizing} />);
    await settled();

    const viewportWidth = document.documentElement.clientWidth;

    await vi.waitFor(() => {
      expect(popoverRect().left).toBeCloseTo(8, 0);
      expect(popoverRect().right).toBeCloseTo(viewportWidth - 8, 0);
    });

    // The swatches wrap inside the panel
    const content = byTestId('content').getBoundingClientRect();

    expect(content.right).toBeLessThanOrEqual(popoverRect().right);
    expect(content.height).toBeGreaterThan(32);
  });

  it.each([
    'border-box',
    'content-box',
  ] as const)('follows the viewport as it narrows and widens while open, %s', async (boxSizing) => {
    await page.viewport(1000, 800);
    await render(<Wide boxSizing={boxSizing} />);
    await settled();

    // 640px of swatches, 16px padding and 4px border on each side
    expect(popoverRect().width).toBeCloseTo(680, 0);

    await page.viewport(400, 800);

    await vi.waitFor(() => {
      expect(popoverRect().left).toBeCloseTo(8, 0);
      expect(popoverRect().right).toBeCloseTo(
        document.documentElement.clientWidth - 8,
        0,
      );
    });

    await page.viewport(1000, 800);

    await vi.waitFor(() => expect(popoverRect().width).toBeCloseTo(680, 0));
  });
});
