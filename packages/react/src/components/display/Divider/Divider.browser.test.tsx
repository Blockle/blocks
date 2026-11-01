import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils/browser/render.js';
import { Divider } from './Divider.js';

describe('Divider (browser)', () => {
  it('renders an empty Divider without a gap between its lines', async () => {
    const screen = await render(<Divider />);
    const divider = screen.getByRole('separator').element();

    expect(getComputedStyle(divider, '::after').display).toBe('none');

    // The single line spans the whole Divider: no flex gap is left over
    expect(getComputedStyle(divider, '::before').width).toBe(
      getComputedStyle(divider).width,
    );
  });

  it('keeps both lines when it has children', async () => {
    const screen = await render(<Divider>Or</Divider>);
    const divider = screen.getByRole('separator').element();

    expect(getComputedStyle(divider, '::after').display).toBe('block');
    expect(
      Number.parseFloat(getComputedStyle(divider, '::before').width),
    ).toBeLessThan(Number.parseFloat(getComputedStyle(divider).width) / 2);
  });
});
