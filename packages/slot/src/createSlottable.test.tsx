import { render } from '@testing-library/react';
import type React from 'react';
import { act, Suspense } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createSlottable } from './createSlottable.js';

type LazyChunk = {
  status: 'pending' | 'fulfilled';
  value?: React.ReactNode;
  listeners: (() => void)[];
  then: (onFulfilled: () => void) => void;
};

/**
 * Builds a lazy element the way React's server-component payload sends a
 * child that streams in later: a chunk that is pending until `resolve` is
 * called. No public API creates one, so this mirrors its shape.
 */
function createLazyElement() {
  const chunk: LazyChunk = {
    status: 'pending',
    listeners: [],
    // biome-ignore lint/suspicious/noThenProperty: React suspends on a thenable chunk
    then(onFulfilled) {
      if (chunk.status === 'fulfilled') {
        onFulfilled();
      } else {
        chunk.listeners.push(onFulfilled);
      }
    },
  };

  const element = {
    $$typeof: Symbol.for('react.lazy'),
    _payload: chunk,
    _init: (payload: LazyChunk) => {
      if (payload.status === 'fulfilled') {
        return payload.value;
      }

      throw payload;
    },
  } as unknown as React.ReactNode;

  const resolve = (value: React.ReactNode) => {
    chunk.status = 'fulfilled';
    chunk.value = value;

    for (const listener of chunk.listeners) {
      listener();
    }
  };

  return { element, resolve };
}

function createResolvedLazyElement(value: React.ReactNode) {
  const lazy = createLazyElement();

  lazy.resolve(value);

  return lazy.element;
}

describe('createSlottable', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should return Template and Slot components', () => {
    const [Template, Slot] = createSlottable('div');

    expect(Template).toBeDefined();
    expect(Slot).toBeDefined();
  });

  describe('Template without asChild', () => {
    it('should render default element with children', () => {
      const [Template] = createSlottable('div');
      const { container } = render(<Template>Content</Template>);

      expect(container.querySelector('div')).toHaveTextContent('Content');
    });

    it('should pass props to default element', () => {
      const [Template] = createSlottable('div');
      const { container } = render(
        <Template className="test">Content</Template>,
      );

      expect(container.querySelector('div')).toHaveClass('test');
    });

    it('should handle ref', () => {
      const [Template] = createSlottable('div');
      const ref = vi.fn();

      render(<Template ref={ref}>Content</Template>);
      expect(ref).toHaveBeenCalled();
    });
  });

  describe('Template with asChild and noSlot', () => {
    it('should merge props with single child', () => {
      const [Template] = createSlottable('div');
      const { container } = render(
        <Template asChild noSlot className="parent">
          <a href="#?" className="child">
            Link
          </a>
        </Template>,
      );
      const link = container.querySelector('a');

      expect(link).toHaveClass('parent', 'child');
      expect(link).toHaveAttribute('href', '#?');
    });

    it('should return null when multiple children provided', () => {
      const [Template] = createSlottable('div');
      const { container } = render(
        <Template asChild noSlot>
          <a href="#?">Link 1</a>
          <a href="#?">Link 2</a>
        </Template>,
      );

      expect(container.firstChild).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'When using asChild, exactly one child is required',
      );
    });

    it('should return null when child is not a valid element', () => {
      const [Template] = createSlottable('div');
      const { container } = render(
        <Template asChild noSlot>
          Text content
        </Template>,
      );

      expect(container.firstChild).toBeNull();
    });

    it('should forward refs when using asChild with noSlot', () => {
      const [Template] = createSlottable('div');
      const templateRef = vi.fn();
      const childRef = vi.fn();

      render(
        <Template asChild noSlot ref={templateRef} className="parent">
          <a href="#?" ref={childRef} className="child">
            Link
          </a>
        </Template>,
      );

      expect(templateRef).toHaveBeenCalled();
      expect(childRef).toHaveBeenCalled();
    });
  });

  describe('Template with asChild and Slot', () => {
    it('should render child with merged props', () => {
      const [Template, Slot] = createSlottable('div');
      const { container } = render(
        <Template asChild className="parent">
          <Slot>
            <a href="#?" className="child">
              Link
            </a>
          </Slot>
        </Template>,
      );
      const link = container.querySelector('a');

      expect(link).toHaveClass('parent', 'child');
      expect(link).toHaveTextContent('Link');
    });

    it('should render additional children alongside Slot child', () => {
      const [Template, Slot] = createSlottable('div');
      const { container } = render(
        <Template asChild className="parent">
          <span>Before</span>
          <Slot>
            <a href="#?">Link</a>
          </Slot>
          <span>After</span>
        </Template>,
      );
      const link = container.querySelector('a');

      expect(link).toBeTruthy();
      expect(container.textContent).toContain('Before');
      expect(container.textContent).toContain('After');
    });

    it('should return null when no Slot provided', () => {
      const [Template] = createSlottable('div');
      const { container } = render(
        <Template asChild>
          <span>Content</span>
        </Template>,
      );

      expect(container.firstChild).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Template: No Slot provided',
      );
    });

    it('should return null when Slot has no children', () => {
      const [Template, Slot] = createSlottable('div');
      const { container } = render(
        <Template asChild>
          <Slot />
        </Template>,
      );

      expect(container.firstChild).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'When using asChild, at least one child is required',
      );
    });

    it('should return null when Slot has multiple children', () => {
      const [Template, Slot] = createSlottable('div');
      const { container } = render(
        <Template asChild>
          <Slot>
            <a href="#?">Link 1</a>
            <a href="#?">Link 2</a>
          </Slot>
        </Template>,
      );

      expect(container.firstChild).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'When using asChild, only one child is allowed',
      );
    });

    it('should return null when Slot child is not valid element', () => {
      const [Template, Slot] = createSlottable('div');
      const { container } = render(
        <Template asChild>
          <Slot>Text content</Slot>
        </Template>,
      );

      expect(container.firstChild).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'When using asChild, the single child must be a valid React element',
      );
    });

    it('should handle single Slot without nested children', () => {
      const [Template, Slot] = createSlottable('div');
      const { container } = render(
        <Template asChild className="parent">
          <Slot>
            {/** biome-ignore lint/a11y/useAnchorContent: test suite */}
            <a href="#?" className="child" />
          </Slot>
        </Template>,
      );
      const link = container.querySelector('a');

      expect(link).toHaveClass('parent', 'child');
    });

    it('should merge refs from both Template and child', () => {
      const [Template, Slot] = createSlottable('div');
      const templateRef = vi.fn();
      const childRef = vi.fn();

      render(
        <Template asChild ref={templateRef}>
          <Slot>
            <a href="#?" ref={childRef}>
              Link
            </a>
          </Slot>
        </Template>,
      );

      expect(templateRef).toHaveBeenCalled();
      expect(childRef).toHaveBeenCalled();
    });
  });

  describe('Template with asChild and a lazy Slot child', () => {
    it('should render a resolved lazy child on the server like the element itself', () => {
      const [Template, Slot] = createSlottable('div');
      const child = (
        <a href="/x" className="child">
          x
        </a>
      );

      const lazyHtml = renderToString(
        <Template asChild className="parent">
          <Slot>{createResolvedLazyElement(child)}</Slot>
        </Template>,
      );
      const directHtml = renderToString(
        <Template asChild className="parent">
          <Slot>{child}</Slot>
        </Template>,
      );

      expect(lazyHtml).toBe('<a href="/x" class="parent child">x</a>');
      expect(lazyHtml).toBe(directHtml);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should render a resolved lazy child in the browser with merged props', () => {
      const [Template, Slot] = createSlottable('div');
      const { container } = render(
        <Template asChild className="parent">
          <Slot>
            {createResolvedLazyElement(
              <a href="/x" className="child">
                x
              </a>,
            )}
          </Slot>
        </Template>,
      );

      expect(container.innerHTML).toBe(
        '<a href="/x" class="parent child">x</a>',
      );
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should hydrate server markup of a lazy child without a mismatch', async () => {
      const [Template, Slot] = createSlottable('div');
      const app = (
        <Template asChild className="parent">
          <Slot>
            {createResolvedLazyElement(
              <a href="/x" className="child">
                x
              </a>,
            )}
          </Slot>
        </Template>
      );
      const container = document.createElement('div');
      const onRecoverableError = vi.fn();

      container.innerHTML = renderToString(app);
      document.body.appendChild(container);

      await act(async () => {
        hydrateRoot(container, app, { onRecoverableError });
      });

      expect(onRecoverableError).not.toHaveBeenCalled();
      expect(consoleErrorSpy).not.toHaveBeenCalled();
      expect(container.innerHTML).toBe(
        '<a href="/x" class="parent child">x</a>',
      );

      container.remove();
    });

    it('should suspend to the nearest Suspense boundary while a lazy child is pending', async () => {
      const [Template, Slot] = createSlottable('div');
      const lazy = createLazyElement();
      const { container } = render(
        <Suspense fallback={<span>Loading</span>}>
          <Template asChild className="parent">
            <Slot>{lazy.element}</Slot>
          </Template>
        </Suspense>,
      );

      expect(container.innerHTML).toBe('<span>Loading</span>');

      await act(async () => {
        lazy.resolve(
          <a href="/x" className="child">
            x
          </a>,
        );
      });

      expect(container.innerHTML).toBe(
        '<a href="/x" class="parent child">x</a>',
      );
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });

  it('should work with different HTML elements', () => {
    const [Template] = createSlottable('button');
    const { container } = render(<Template type="submit">Click me</Template>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveTextContent('Click me');
  });
});
