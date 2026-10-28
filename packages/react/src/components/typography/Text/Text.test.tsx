import { atoms } from '@blockle/blocks-core';
import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils/testUtils.js';
import { Text } from './Text.js';

describe('Text Component', () => {
  it('renders with default tag "span"', () => {
    const { container } = render(<Text>Default Text</Text>);
    const spanElement = container.querySelector('span');

    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveTextContent('Default Text');
  });

  it('renders with a custom tag when "tag" prop is provided', () => {
    const { container } = render(<Text tag="p">Paragraph Text</Text>);
    const pElement = container.querySelector('p');

    expect(pElement).toBeInTheDocument();
    expect(pElement).toHaveTextContent('Paragraph Text');
  });

  it.each([
    'code',
    'kbd',
    'mark',
    'q',
    'cite',
  ] as const)('renders a "%s" tag', (tag) => {
    const { container } = render(<Text tag={tag}>Content</Text>);

    expect(container.querySelector(tag)).toHaveTextContent('Content');
  });

  it('renders children directly when "asChild" is true', () => {
    const { container } = render(
      <Text asChild>
        <strong>Strong Text</strong>
      </Text>,
    );
    const strongElement = container.querySelector('strong');

    expect(strongElement).toBeInTheDocument();
    expect(strongElement).toHaveTextContent('Strong Text');
  });

  it('applies additional class names', () => {
    const { container } = render(
      <Text className="custom-class">Text with Class</Text>,
    );
    const spanElement = container.querySelector('span');

    expect(spanElement).toHaveClass('custom-class');
  });

  it('forwards refs correctly', () => {
    const ref: { current: HTMLElement | null } = { current: null };

    render(<Text ref={ref}>Text with Ref</Text>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SPAN');
  });

  it('applies the display font size atom', () => {
    const { container } = render(<Text fontSize="display">Title</Text>);

    expect(container.querySelector('span')).toHaveClass(
      atoms({ fontSize: 'display' }),
    );
  });
});
