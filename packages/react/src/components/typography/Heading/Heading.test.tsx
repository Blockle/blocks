import { atoms } from '@blockle/blocks-core';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { render } from '../../../testUtils/testUtils.js';
import { Heading } from './Heading.js';

describe('Heading', () => {
  it('renders the correct heading level', () => {
    const { container } = render(<Heading level={2}>Test Heading</Heading>);
    const heading = container.querySelector('h2');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Heading');
  });

  it('applies the correct className', () => {
    const { container } = render(
      <Heading level={1} className="custom-class">
        Test Heading
      </Heading>,
    );
    const heading = container.querySelector('h1');
    expect(heading).toHaveClass('custom-class');
  });

  it('renders children correctly', () => {
    const { getByText } = render(<Heading level={3}>Child Content</Heading>);
    expect(getByText('Child Content')).toBeInTheDocument();
  });

  it('passes additional props to the underlying element', () => {
    const { container } = render(
      <Heading level={4} id="heading-id" data-test="test-prop">
        Test Heading
      </Heading>,
    );
    const heading = container.querySelector('h4');
    expect(heading).toHaveAttribute('id', 'heading-id');
    expect(heading).toHaveAttribute('data-test', 'test-prop');
  });

  it('applies a logical textAlign', () => {
    const { container } = render(
      <Heading level={2} textAlign="start">
        Test Heading
      </Heading>,
    );

    expect(container.querySelector('h2')).toHaveClass(
      atoms({ textAlign: 'start' }),
    );
  });

  it('accepts no physical keys for textAlign', () => {
    render(
      // @ts-expect-error use textAlign="start"
      <Heading level={2} textAlign="left">
        Test Heading
      </Heading>,
    );
  });

  describe('overflow', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    const classesOf = (ui: React.ReactElement) =>
      render(ui).container.querySelector('h2')?.className;

    it('renders the same classes as before without lineClamp or truncate', () => {
      expect(
        classesOf(
          <Heading level={2} truncate={false}>
            Title
          </Heading>,
        ),
      ).toBe(classesOf(<Heading level={2}>Title</Heading>));
    });

    it('adds a class for lineClamp and for truncate, kept off the DOM', () => {
      const plain = classesOf(<Heading level={2}>Title</Heading>);
      const { container } = render(
        <>
          <Heading level={2} lineClamp={2}>
            Clamped
          </Heading>
          <Heading level={2} truncate>
            Truncated
          </Heading>
        </>,
      );
      const [clamped, truncated] = container.querySelectorAll('h2');

      expect(clamped?.className).not.toBe(plain);
      expect(truncated?.className).not.toBe(plain);
      expect(clamped?.className).not.toBe(truncated?.className);
      expect(clamped).not.toHaveAttribute('lineclamp');
      expect(truncated).not.toHaveAttribute('truncate');
    });

    it('applies lineClamp and warns when truncate is also set', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

      expect(
        classesOf(
          <Heading level={2} lineClamp={2} truncate>
            Title
          </Heading>,
        ),
      ).toBe(
        classesOf(
          <Heading level={2} lineClamp={2}>
            Title
          </Heading>,
        ),
      );
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('Heading: `lineClamp` and `truncate`'),
      );
    });

    it('accepts lineClamp from 1 to 5 only', () => {
      render(<Heading lineClamp={1}>Title</Heading>);
      // @ts-expect-error 6 is not a lineClamp value
      render(<Heading lineClamp={6}>Title</Heading>);
    });
  });
});
