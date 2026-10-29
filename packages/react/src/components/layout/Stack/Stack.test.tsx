import { atoms } from '@blockle/blocks-core';
import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Stack } from './Stack.js';

describe('Stack Component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a div by default', () => {
    const { container } = render(<Stack gap={2}>Content</Stack>);

    expect(container.querySelector('div')).toHaveTextContent('Content');
  });

  it('renders a div with the layout classes and a className', () => {
    const { container } = render(
      <Stack gap={2} className="custom">
        Content
      </Stack>,
    );

    const element = container.firstElementChild;

    expect(element?.tagName).toBe('DIV');
    expect(element).toHaveClass(
      'custom',
      atoms({
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }),
    );
  });

  it('has no tag prop, and renders a div', () => {
    const { container } = render(
      // @ts-expect-error tag was removed, use asChild
      <Stack tag="ul" gap={2}>
        Content
      </Stack>,
    );

    expect(container.querySelector('ul')).not.toBeInTheDocument();
    expect(container.firstElementChild?.tagName).toBe('DIV');
  });

  it('adds no listStyle class', () => {
    const { container } = render(<Stack gap={2}>Content</Stack>);

    expect(container.querySelector('div')).not.toHaveClass(
      atoms({ listStyle: 'none' }),
    );
  });

  it('accepts additional atoms such as background and alignItems', () => {
    const { container } = render(
      <Stack gap={2} backgroundColor="currentColor" alignItems="baseline">
        Content
      </Stack>,
    );

    expect(container.firstElementChild?.className).not.toBe('');
  });

  it('renders HTML attributes on the element', () => {
    render(
      <Stack id="x" aria-labelledby="h" data-test="s" gap={2}>
        Content
      </Stack>,
    );

    const element = document.getElementById('x');

    expect(element).toHaveAttribute('aria-labelledby', 'h');
    expect(element).toHaveAttribute('data-test', 's');
  });

  it('fires onClick and onKeyDown on the element', () => {
    const onClick = vi.fn();
    const onKeyDown = vi.fn();

    render(
      <Stack
        data-testid="stack"
        gap={2}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        Content
      </Stack>,
    );

    fireEvent.click(screen.getByTestId('stack'));
    fireEvent.keyDown(screen.getByTestId('stack'), { key: 'Escape' });

    expect(onClick).toHaveBeenCalledOnce();
    expect(onKeyDown).toHaveBeenCalledOnce();
  });

  it('points a ref at the rendered element', () => {
    const ref = createRef<HTMLElement>();

    render(
      <Stack ref={ref} data-testid="stack" gap={2}>
        Content
      </Stack>,
    );

    expect(ref.current).toBe(screen.getByTestId('stack'));
  });

  it('forwards start as an HTML attribute without warning', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <Stack asChild start={3} gap={2}>
        <ol>
          <li>Item</li>
        </ol>
      </Stack>,
    );

    expect(screen.getByRole('list')).toHaveAttribute('start', '3');
    expect(warn).not.toHaveBeenCalled();
  });

  describe('asChild', () => {
    it('renders the child element with the layout classes', () => {
      const { container } = render(
        <ul>
          <Stack asChild gap={2}>
            <li className="item">Item</li>
          </Stack>
        </ul>,
      );

      const item = screen.getByRole('listitem');

      expect(container.querySelectorAll('ul > *')).toHaveLength(1);
      expect(item).toHaveClass(
        'item',
        atoms({ display: 'flex', flexDirection: 'column', gap: 2 }),
      );
    });

    it('points a ref at the child element', () => {
      const ref = createRef<HTMLElement>();

      render(
        <ul>
          <Stack asChild ref={ref} gap={2}>
            <li>Item</li>
          </Stack>
        </ul>,
      );

      expect(ref.current).toBe(screen.getByRole('listitem'));
    });

    it.each([
      'ul',
      'ol',
    ] as const)('renders a single %s with the layout and listStyle classes', (Tag) => {
      const { container } = render(
        <Stack asChild gap={2} listStyle="none">
          <Tag>
            <li>Item</li>
          </Tag>
        </Stack>,
      );

      expect(container.childElementCount).toBe(1);
      expect(container.firstElementChild?.tagName).toBe(Tag.toUpperCase());
      expect(container.firstElementChild).toHaveClass(
        atoms({
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          listStyle: 'none',
        }),
      );
    });

    it('adds no listStyle class to a list child on its own', () => {
      render(
        <Stack asChild gap={2}>
          <ul>
            <li>Item</li>
          </ul>
        </Stack>,
      );

      expect(screen.getByRole('list')).not.toHaveClass(
        atoms({ listStyle: 'none' }),
      );
    });

    it('renders a role passed to it on the child', () => {
      render(
        <Stack asChild gap={2} listStyle="none" role="list">
          <ul>
            <li>Item</li>
          </ul>
        </Stack>,
      );

      expect(screen.getByRole('list')).toHaveAttribute('role', 'list');
    });
  });
});
