import { atoms } from '@blockle/blocks-core';
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

  it.each([
    'ul',
    'ol',
  ] as const)('drops the list markers for tag="%s"', (tag) => {
    const { container } = render(
      <Inline tag={tag} gap={2}>
        <li>Item</li>
      </Inline>,
    );

    expect(container.querySelector(tag)).toHaveClass(
      atoms({ listStyle: 'none' }),
    );
  });

  it.each([
    'div',
    'nav',
  ] as const)('adds no listStyle class for tag="%s"', (tag) => {
    const { container } = render(
      <Inline tag={tag} gap={2}>
        Content
      </Inline>,
    );

    expect(container.querySelector(tag)).not.toHaveClass(
      atoms({ listStyle: 'none' }),
    );
  });

  it('adds no role itself, and renders a role passed to it', () => {
    const { container, rerender } = render(
      <Inline tag="ol" gap={2}>
        <li>Item</li>
      </Inline>,
    );

    expect(container.querySelector('ol')).not.toHaveAttribute('role');

    rerender(
      <Inline tag="ol" gap={2} role="list">
        <li>Item</li>
      </Inline>,
    );

    expect(container.querySelector('ol')).toHaveAttribute('role', 'list');
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
