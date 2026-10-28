import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils/browser/render.js';
import { Tooltip, type TooltipProps } from './Tooltip.js';

async function renderTooltip(
  props: Pick<TooltipProps, 'placement' | 'position'>,
) {
  const screen = await render(
    <div style={{ position: 'fixed', top: 300, left: 200 }}>
      <Tooltip {...props} content="Tip">
        <button type="button">Anchor</button>
      </Tooltip>
    </div>,
  );
  const anchor = screen.getByRole('button').element();

  (anchor as HTMLElement).focus();

  await expect.element(screen.getByRole('tooltip')).toBeVisible();

  const tooltip = screen.getByRole('tooltip').element();

  // Wait for the opening transition, which scales the tooltip
  await Promise.all(tooltip.getAnimations().map((a) => a.finished));

  return {
    anchor: anchor.getBoundingClientRect(),
    tooltip: tooltip.getBoundingClientRect(),
  };
}

describe('Tooltip placement (browser)', () => {
  it('opens on the placement side, lined up with the edge', async () => {
    const { anchor, tooltip } = await renderTooltip({
      placement: 'bottom-start',
    });

    expect(tooltip.top).toBeGreaterThanOrEqual(anchor.bottom);
    expect(tooltip.left).toBeCloseTo(anchor.left, 0);
  });

  it('opens on top by default', async () => {
    const { anchor, tooltip } = await renderTooltip({});

    expect(tooltip.bottom).toBeLessThanOrEqual(anchor.top);
  });

  it('prefers placement over the deprecated position', async () => {
    const { anchor, tooltip } = await renderTooltip({
      placement: 'bottom',
      position: 'top',
    });

    expect(tooltip.top).toBeGreaterThanOrEqual(anchor.bottom);
  });
});
