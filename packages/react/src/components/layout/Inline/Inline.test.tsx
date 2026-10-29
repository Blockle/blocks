import { atoms } from '@blockle/blocks-core';
import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Inline } from './Inline.js';

describe('Inline Component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a div by default', () => {
    const { container } = render(<Inline gap={2}>Content</Inline>);

    expect(container.querySelector('div')).toHaveTextContent('Content');
  });

  it('has no tag prop, and renders a div', () => {
    const { container } = render(
      // @ts-expect-error tag was removed, use asChild
      <Inline tag="nav" gap={2}>
        Content
      </Inline>,
    );

    expect(container.querySelector('nav')).not.toBeInTheDocument();
    expect(container.firstElementChild?.tagName).toBe('DIV');
  });

  it('adds no listStyle class', () => {
    const { container } = render(<Inline gap={2}>Content</Inline>);

    expect(container.querySelector('div')).not.toHaveClass(
      atoms({ listStyle: 'none' }),
    );
  });

  it('accepts additional atoms such as background and alignItems', () => {
    const { container } = render(
      <Inline gap={2} backgroundColor="currentColor" alignItems="baseline">
        Content
      </Inline>,
    );

    expect(container.firstElementChild?.className).not.toBe('');
  });

  it('renders HTML attributes on the element', () => {
    render(
      <Inline id="x" aria-labelledby="h" data-test="s" gap={2}>
        Content
      </Inline>,
    );

    const element = document.getElementById('x');

    expect(element).toHaveAttribute('aria-labelledby', 'h');
    expect(element).toHaveAttribute('data-test', 's');
  });

  it('fires onClick and onKeyDown on the element', () => {
    const onClick = vi.fn();
    const onKeyDown = vi.fn();

    render(
      <Inline
        data-testid="inline"
        gap={2}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        Content
      </Inline>,
    );

    fireEvent.click(screen.getByTestId('inline'));
    fireEvent.keyDown(screen.getByTestId('inline'), { key: 'Escape' });

    expect(onClick).toHaveBeenCalledOnce();
    expect(onKeyDown).toHaveBeenCalledOnce();
  });

  it('points a ref at the rendered element', () => {
    const ref = createRef<HTMLElement>();

    render(
      <Inline ref={ref} data-testid="inline" gap={2}>
        Content
      </Inline>,
    );

    expect(ref.current).toBe(screen.getByTestId('inline'));
  });

  describe('asChild', () => {
    it('renders the child element with the layout classes and its own attributes', () => {
      const { container } = render(
        <Inline asChild gap={1}>
          <span role="img" aria-label="Acceptance criteria: 2 of 4 checked">
            2/4
          </span>
        </Inline>,
      );

      const image = screen.getByRole('img', {
        name: 'Acceptance criteria: 2 of 4 checked',
      });

      expect(container.childElementCount).toBe(1);
      expect(container.firstElementChild).toBe(image);
      expect(image.tagName).toBe('SPAN');
      expect(image).toHaveClass(
        atoms({ display: 'flex', flexDirection: 'row', gap: 1 }),
      );
    });

    it('points a ref at the child element', () => {
      const ref = createRef<HTMLElement>();

      render(
        <Inline asChild ref={ref} gap={1}>
          <span role="toolbar">Content</span>
        </Inline>,
      );

      expect(ref.current).toBe(screen.getByRole('toolbar'));
    });

    it.each([
      'ol',
      'nav',
    ] as const)('renders a single %s with the layout and listStyle classes', (Tag) => {
      const { container } = render(
        <Inline asChild gap={2} listStyle="none">
          <Tag>Content</Tag>
        </Inline>,
      );

      expect(container.childElementCount).toBe(1);
      expect(container.firstElementChild?.tagName).toBe(Tag.toUpperCase());
      expect(container.firstElementChild).toHaveClass(
        atoms({
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          listStyle: 'none',
        }),
      );
    });

    it('adds no listStyle class to a list child on its own', () => {
      render(
        <Inline asChild gap={2}>
          <ol>
            <li>Item</li>
          </ol>
        </Inline>,
      );

      expect(screen.getByRole('list')).not.toHaveClass(
        atoms({ listStyle: 'none' }),
      );
    });

    it('renders a role passed to it on the child', () => {
      render(
        <Inline asChild gap={2} listStyle="none" role="list">
          <ol>
            <li>Item</li>
          </ol>
        </Inline>,
      );

      expect(screen.getByRole('list')).toHaveAttribute('role', 'list');
    });
  });
});
