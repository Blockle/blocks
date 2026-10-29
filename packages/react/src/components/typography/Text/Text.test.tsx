import { atoms } from '@blockle/blocks-core';
import { afterEach, describe, expect, it, vi } from 'vitest';

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

  describe('overflow', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    const classesOf = (ui: React.ReactElement) =>
      render(ui).container.querySelector('span')?.className;

    it('renders the same classes as before without lineClamp or truncate', () => {
      expect(classesOf(<Text truncate={false}>Text</Text>)).toBe(
        classesOf(<Text>Text</Text>),
      );
    });

    it('adds a class for lineClamp and keeps it off the DOM', () => {
      const { container } = render(<Text lineClamp={2}>Text</Text>);
      const span = container.querySelector('span');

      expect(span?.className).not.toBe(classesOf(<Text>Text</Text>));
      expect(span).not.toHaveAttribute('lineClamp');
      expect(span).not.toHaveAttribute('lineclamp');
    });

    it('adds a class for truncate and keeps it off the DOM', () => {
      const { container } = render(<Text truncate>Text</Text>);
      const span = container.querySelector('span');

      expect(span?.className).not.toBe(classesOf(<Text>Text</Text>));
      expect(span).not.toHaveAttribute('truncate');
    });

    it('applies lineClamp and warns when truncate is also set', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

      expect(
        classesOf(
          <Text lineClamp={3} truncate>
            Text
          </Text>,
        ),
      ).toBe(classesOf(<Text lineClamp={3}>Text</Text>));
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('`lineClamp` applies'),
      );
    });

    it('does not warn for lineClamp alone', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(<Text lineClamp={3}>Text</Text>);

      expect(warn).not.toHaveBeenCalled();
    });

    it('accepts lineClamp from 1 to 5 only', () => {
      render(<Text lineClamp={1}>Text</Text>);
      render(<Text lineClamp={5}>Text</Text>);
      // @ts-expect-error 0 is not a lineClamp value
      render(<Text lineClamp={0}>Text</Text>);
      // @ts-expect-error 6 is not a lineClamp value
      render(<Text lineClamp={6}>Text</Text>);
    });
  });
});
