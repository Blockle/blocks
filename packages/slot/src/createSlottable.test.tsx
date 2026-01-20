import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createSlottable } from './createSlottable.js';

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
        'When using asChild, one child is required',
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

  it('should work with different HTML elements', () => {
    const [Template] = createSlottable('button');
    const { container } = render(<Template type="submit">Click me</Template>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveTextContent('Click me');
  });
});
