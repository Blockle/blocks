import type { Theme } from '@blockle/blocks-core';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Portal } from '../../overlay/Portal/Portal.js';
import { BlocksProvider } from './BlocksProvider.js';
import { BlocksProviderContext } from './context.js';

describe('BlocksProvider', () => {
  const mockTheme: Theme = {
    vars: 'mock-vars',
    name: 'mock-theme',
    components: {},
  };

  it('renders children correctly', () => {
    const { getByText } = render(
      <BlocksProvider theme={mockTheme}>
        <div>Test Child</div>
      </BlocksProvider>,
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('provides the theme context value', () => {
    let contextValue: unknown = null;

    render(
      <BlocksProviderContext.Consumer>
        {(value) => {
          contextValue = value;
          return null;
        }}
      </BlocksProviderContext.Consumer>,
      {
        wrapper: ({ children }) => (
          <BlocksProvider theme={mockTheme}>{children}</BlocksProvider>
        ),
      },
    );

    expect(contextValue).toEqual({ theme: mockTheme, colorMode: 'system' });
  });

  it('applies the correct className and styles', () => {
    const { container } = render(
      <BlocksProvider
        theme={mockTheme}
        className="custom-class"
        style={{ content: 'test' }}
      >
        <div>Test Child</div>
      </BlocksProvider>,
    );

    const templateElement = container.firstChild as HTMLElement;

    expect(templateElement).toHaveClass('custom-class');
    expect(templateElement).toHaveStyle({ content: 'test' });
    expect(templateElement).toHaveClass('mock-vars');
  });

  describe('color mode', () => {
    const colorMode = () => document.documentElement.dataset.colorMode;

    it('defaults to system', () => {
      render(<BlocksProvider theme={mockTheme}>child</BlocksProvider>);

      expect(colorMode()).toBe('system');
    });

    it.each([
      'light',
      'dark',
      'system',
    ] as const)('writes %s on <html>', (mode) => {
      render(
        <BlocksProvider theme={mockTheme} colorMode={mode}>
          child
        </BlocksProvider>,
      );

      expect(colorMode()).toBe(mode);
    });

    it('keeps the attribute in sync when the prop changes', () => {
      const { rerender } = render(
        <BlocksProvider theme={mockTheme} colorMode="light">
          child
        </BlocksProvider>,
      );

      rerender(
        <BlocksProvider theme={mockTheme} colorMode="dark">
          child
        </BlocksProvider>,
      );

      expect(colorMode()).toBe('dark');
    });

    it('removes the attribute when the outermost provider unmounts', () => {
      const { unmount } = render(
        <BlocksProvider theme={mockTheme}>child</BlocksProvider>,
      );

      unmount();

      expect(colorMode()).toBeUndefined();
    });

    it('does not change the attribute when a Portal is opened', () => {
      const { rerender } = render(
        <BlocksProvider theme={mockTheme} colorMode="dark">
          child
        </BlocksProvider>,
      );

      rerender(
        <BlocksProvider theme={mockTheme} colorMode="dark">
          <Portal>portaled</Portal>
        </BlocksProvider>,
      );

      expect(colorMode()).toBe('dark');
    });

    it('warns and ignores colorMode on a nested provider', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <BlocksProvider theme={mockTheme} colorMode="dark">
          <BlocksProvider theme={mockTheme} colorMode="light">
            child
          </BlocksProvider>
        </BlocksProvider>,
      );

      expect(colorMode()).toBe('dark');
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('colorMode'));

      warn.mockRestore();
    });

    it('does not warn on a nested provider without colorMode', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <BlocksProvider theme={mockTheme}>
          <BlocksProvider theme={mockTheme}>child</BlocksProvider>
        </BlocksProvider>,
      );

      expect(warn).not.toHaveBeenCalled();

      warn.mockRestore();
    });
  });
});
