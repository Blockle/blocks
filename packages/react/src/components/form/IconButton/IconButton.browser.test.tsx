import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils/browser/render.js';
import { Button } from '../Button/Button.js';
import { IconButton } from './IconButton.js';

const icon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

describe('IconButton geometry (browser)', () => {
  for (const [size, expected] of [
    ['small', 40],
    ['medium', 48],
    ['large', 56],
  ] as const) {
    it(`is a ${expected}px square as tall as a ${size} Button`, async () => {
      const screen = await render(
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <Button size={size}>Save</Button>
          <IconButton size={size} label="Close">
            {icon}
          </IconButton>
        </div>,
      );
      const button = screen
        .getByRole('button', { name: 'Save' })
        .element()
        .getBoundingClientRect();
      const iconButton = screen
        .getByRole('button', { name: 'Close' })
        .element()
        .getBoundingClientRect();

      expect(iconButton.height).toBe(expected);
      expect(iconButton.width).toBe(expected);
      expect(iconButton.height).toBe(button.height);
      await screen.unmount();
    });
  }

  it('is fully round with the circle shape', async () => {
    const screen = await render(
      <IconButton shape="circle" label="Close">
        {icon}
      </IconButton>,
    );
    const style = getComputedStyle(screen.getByRole('button').element());

    expect(style.borderRadius).toBe('50%');
  });

  it('sizes a direct svg child per button size', async () => {
    const screen = await render(
      <IconButton size="large" label="Close">
        {icon}
      </IconButton>,
    );
    const svg = screen
      .getByRole('button')
      .element()
      .querySelector('svg')
      ?.getBoundingClientRect();

    expect(svg?.width).toBe(28);
    expect(svg?.height).toBe(28);
  });

  it('centers the icon', async () => {
    const screen = await render(
      <IconButton size="large" label="Close">
        {icon}
      </IconButton>,
    );
    const button = screen.getByRole('button').element();
    const outer = button.getBoundingClientRect();
    const inner = button.querySelector('svg')?.getBoundingClientRect();

    expect(inner?.left).toBe(outer.left + 14);
    expect(inner?.top).toBe(outer.top + 14);
  });
});
