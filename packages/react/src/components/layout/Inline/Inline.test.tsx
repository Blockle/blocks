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

  it('renders HTML attributes on the element', () => {
    render(
      <Inline tag="ul" id="x" aria-labelledby="h" data-test="s" gap={2}>
        <li>Item</li>
      </Inline>,
    );

    const list = screen.getByRole('list');

    expect(list).toHaveAttribute('id', 'x');
    expect(list).toHaveAttribute('aria-labelledby', 'h');
    expect(list).toHaveAttribute('data-test', 's');
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
      <Inline ref={ref} tag="nav" gap={2}>
        Content
      </Inline>,
    );

    expect(ref.current).toBe(screen.getByRole('navigation'));
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

    it('ignores tag without logging, and applies no tag-based defaults', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});
      const { container } = render(
        <Inline asChild tag="ul" gap={1}>
          <span>Content</span>
        </Inline>,
      );

      expect(container.querySelector('ul')).not.toBeInTheDocument();
      expect(container.querySelector('span')).not.toHaveClass(
        atoms({ listStyle: 'none' }),
      );
      expect(warn).not.toHaveBeenCalled();
      expect(error).not.toHaveBeenCalled();
    });
  });
});
