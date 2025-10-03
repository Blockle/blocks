import type { Theme } from '@blockle/blocks-core';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
    let contextValue: { theme: Theme } | null = null;

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

    expect(contextValue).toEqual({ theme: mockTheme });
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
});
