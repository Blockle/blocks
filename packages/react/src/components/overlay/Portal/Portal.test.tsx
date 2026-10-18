import { describe, expect, it } from 'vitest';

import { testingTheme } from '../../../testUtils/testTheme.css.js';
import { render, screen } from '../../../testUtils/testUtils.js';
import { BlocksProvider } from '../../providers/BlocksProvider/BlocksProvider.js';
import { Portal } from './Portal.js';

describe('Portal', () => {
  it('renders its children outside the opening element', () => {
    render(
      <div data-testid="opener">
        <Portal>
          <span>Portal content</span>
        </Portal>
      </div>,
    );

    expect(screen.getByTestId('opener')).not.toContainElement(
      screen.getByText('Portal content'),
    );
  });

  it('carries the color scheme of the provider that opened it', () => {
    render(
      <BlocksProvider theme={testingTheme} colorScheme="dark">
        <Portal>
          <span>Portal content</span>
        </Portal>
      </BlocksProvider>,
    );

    expect(
      screen.getByText('Portal content').closest('[data-color-scheme]'),
    ).toHaveAttribute('data-color-scheme', 'dark');
  });
});
