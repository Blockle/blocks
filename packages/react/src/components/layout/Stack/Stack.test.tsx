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

  it('renders a custom tag', () => {
    const { container } = render(
      <Stack tag="ul" gap={2}>
        <li>Item</li>
      </Stack>,
    );

    expect(container.querySelector('ul')).toBeInTheDocument();
  });

  it.each([
    'ul',
    'ol',
  ] as const)('drops the list markers for tag="%s"', (tag) => {
    const { container } = render(
      <Stack tag={tag} gap={2}>
        <li>Item</li>
      </Stack>,
    );

    expect(container.querySelector(tag)).toHaveClass(
      atoms({ listStyle: 'none' }),
    );
  });

  it.each([
    'div',
    'section',
  ] as const)('adds no listStyle class for tag="%s"', (tag) => {
    const { container } = render(
      <Stack tag={tag} gap={2}>
        Content
      </Stack>,
    );

    expect(container.querySelector(tag)).not.toHaveClass(
      atoms({ listStyle: 'none' }),
    );
  });

  it('adds no role itself, and renders a role passed to it', () => {
    const { container, rerender } = render(
      <Stack tag="ul" gap={2}>
        <li>Item</li>
      </Stack>,
    );

    expect(container.querySelector('ul')).not.toHaveAttribute('role');

    rerender(
      <Stack tag="ul" gap={2} role="list">
        <li>Item</li>
      </Stack>,
    );

    expect(container.querySelector('ul')).toHaveAttribute('role', 'list');
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
      <Stack tag="ul" id="x" aria-labelledby="h" data-test="s" gap={2}>
        <li>Item</li>
      </Stack>,
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
      <Stack ref={ref} tag="ul" gap={2}>
        <li>Item</li>
      </Stack>,
    );

    expect(ref.current).toBe(screen.getByRole('list'));
  });

  it('warns when start is passed without tag="ol"', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <Stack tag="ul" start={2} gap={2}>
        <li>Item</li>
      </Stack>,
    );

    expect(warn).toHaveBeenCalledWith(
      'Stack: "start" prop is only valid with tag="ol"',
    );
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

    it('ignores tag without logging, and applies no tag-based defaults', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});
      const { container } = render(
        <Stack asChild tag="ul" start={2} gap={2}>
          <section>Content</section>
        </Stack>,
      );

      expect(container.querySelector('ul')).not.toBeInTheDocument();
      expect(container.querySelector('section')).not.toHaveClass(
        atoms({ listStyle: 'none' }),
      );
      expect(warn).not.toHaveBeenCalled();
      expect(error).not.toHaveBeenCalled();
    });
  });
});
