import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Stack } from './Stack.js';

describe('Stack Component', () => {
  it('renders a div by default', () => {
    const { container } = render(<Stack gap={2}>Content</Stack>);

    expect(container.querySelector('div')).toHaveTextContent('Content');
  });

  it('renders a custom tag', () => {
    const { container } = render(
      <Stack tag="ul" gap={2}>
        <li>Item</li>
      </Stack>,
    );

    expect(container.querySelector('ul')).toBeInTheDocument();
  });

  it('accepts additional atoms such as background and alignItems', () => {
    const { container } = render(
      <Stack gap={2} backgroundColor="currentColor" alignItems="baseline">
        Content
      </Stack>,
    );

    expect(container.firstElementChild?.className).not.toBe('');
  });
});
