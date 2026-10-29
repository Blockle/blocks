import { describe, expect, it } from 'vitest';

import * as blocks from '../index.js';
import { render } from '../testUtils/testUtils.js';
import * as icons from './icons.js';

describe('icons', () => {
  it.each(
    Object.entries(icons),
  )('%s renders a decorative svg', (_name, Icon) => {
    const { container } = render(<Icon />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg?.querySelector('path')).toHaveAttribute('d');
  });

  it('are not exported from the package', () => {
    for (const name of Object.keys(icons)) {
      expect(blocks).not.toHaveProperty(name);
    }
  });
});
