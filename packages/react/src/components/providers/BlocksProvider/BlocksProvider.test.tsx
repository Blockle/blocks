import { atoms, type Theme } from '@blockle/blocks-core';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BlocksProvider } from './BlocksProvider.js';
import {
  BlocksProviderContext,
  type BlocksProviderContextProps,
} from './context.js';

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

  it('provides the theme and color scheme context value', () => {
    let contextValue: BlocksProviderContextProps | null = null;

    render(
      <BlocksProviderContext.Consumer>
        {(value) => {
          contextValue = value;
          return null;
        }}
      </BlocksProviderContext.Consumer>,
      {
        wrapper: ({ children }) => (
          <BlocksProvider theme={mockTheme} colorScheme="dark">
            {children}
          </BlocksProvider>
        ),
      },
    );

    expect(contextValue).toEqual({ theme: mockTheme, colorScheme: 'dark' });
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

  it.each([
    'light',
    'dark',
    'system',
  ] as const)('renders data-color-scheme="%s" for that colorScheme', (colorScheme) => {
    const { getByTestId } = render(
      <BlocksProvider
        theme={mockTheme}
        colorScheme={colorScheme}
        data-testid="provider"
      >
        <div>Test Child</div>
      </BlocksProvider>,
    );

    expect(getByTestId('provider')).toHaveAttribute(
      'data-color-scheme',
      colorScheme,
    );
  });

  it('renders data-color-scheme="system" for a top-level provider without colorScheme', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={mockTheme} data-testid="provider">
        <div>Test Child</div>
      </BlocksProvider>,
    );

    expect(getByTestId('provider')).toHaveAttribute(
      'data-color-scheme',
      'system',
    );
  });

  it('inherits the parent scheme when a nested provider has no colorScheme', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={mockTheme} colorScheme="dark">
        <BlocksProvider theme={mockTheme} data-testid="nested">
          <div>Test Child</div>
        </BlocksProvider>
      </BlocksProvider>,
    );

    expect(getByTestId('nested')).toHaveAttribute('data-color-scheme', 'dark');
  });

  it('overrides the parent scheme when a nested provider has colorScheme', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={mockTheme} colorScheme="dark">
        <BlocksProvider
          theme={mockTheme}
          colorScheme="light"
          data-testid="nested"
        >
          <div>Test Child</div>
        </BlocksProvider>
      </BlocksProvider>,
    );

    expect(getByTestId('nested')).toHaveAttribute('data-color-scheme', 'light');
  });

  it('paints the surface background and text color roles', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={mockTheme} data-testid="provider">
        <div>Test Child</div>
      </BlocksProvider>,
    );

    expect(getByTestId('provider')).toHaveClass(
      atoms({ backgroundColor: 'surface', color: 'text' }),
    );
  });
});
