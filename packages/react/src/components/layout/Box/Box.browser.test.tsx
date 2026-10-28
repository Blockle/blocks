import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils/browser/render.js';
import { Box } from './Box.js';

describe('Box (browser)', () => {
  it('computes the color of a color atom from the momotaro theme', async () => {
    const screen = await render(<Box color="primary-700">Box content</Box>);

    const element = screen.getByText('Box content').element();

    // primary-700 is #4D3CAB in the momotaro tokens
    expect(getComputedStyle(element).color).toBe('rgb(77, 60, 171)');
  });
});
