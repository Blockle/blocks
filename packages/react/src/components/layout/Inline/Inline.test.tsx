import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Inline } from './Inline.js';

describe('Inline Component', () => {
  it('renders a div by default', () => {
    const { container } = render(<Inline gap={2}>Content</Inline>);

    expect(container.querySelector('div')).toHaveTextContent('Content');
  });

  it('renders a custom tag', () => {
    const { container } = render(
      <Inline tag="nav" gap={2}>
        Content
      </Inline>,
    );

    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('accepts additional atoms such as background and alignItems', () => {
    const { container } = render(
      <Inline gap={2} backgroundColor="currentColor" alignItems="baseline">
        Content
      </Inline>,
    );

    expect(container.firstElementChild?.className).not.toBe('');
  });
});
