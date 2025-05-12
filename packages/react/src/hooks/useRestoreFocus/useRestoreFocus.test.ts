import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useRestoreFocus } from './useRestoreFocus';

describe('useRestoreFocus', () => {
  let originalActiveElement: Element | null;
  let input: HTMLInputElement;
  let button: HTMLButtonElement;

  beforeEach(() => {
    // Set up DOM elements
    input = document.createElement('input');
    button = document.createElement('button');
    document.body.appendChild(input);
    document.body.appendChild(button);

    // Save original active element and focus input
    originalActiveElement = document.activeElement;
    input.focus();
  });

  afterEach(() => {
    // Clean up DOM
    document.body.removeChild(input);
    document.body.removeChild(button);
    // Restore original active element
    if (originalActiveElement instanceof HTMLElement) {
      originalActiveElement.focus();
    }
  });

  it('should store the currently focused element when active is true', () => {
    renderHook(({ active }) => useRestoreFocus(active), {
      initialProps: { active: true },
    });
    expect(document.activeElement).toBe(input);
  });

  it('should restore focus to the previously focused element when active becomes false', () => {
    const { rerender } = renderHook(({ active }) => useRestoreFocus(active), {
      initialProps: { active: true },
    });

    // Change focus to button
    button.focus();
    expect(document.activeElement).toBe(button);

    // Deactivate hook, should restore focus to input
    act(() => {
      rerender({ active: false });
    });

    expect(document.activeElement).toBe(input);
  });

  it('should not throw if there is no previously focused element', () => {
    const { rerender } = renderHook(({ active }) => useRestoreFocus(active), {
      initialProps: { active: false },
    });

    expect(() => {
      rerender({ active: true });
      rerender({ active: false });
    }).not.toThrow();
  });
});
