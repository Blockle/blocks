import type { Theme } from '@blockle/blocks-core';
import { describe, expect, it } from 'vitest';

import { testingTheme } from '../../../testUtils/testTheme.css.js';
import { render, screen } from '../../../testUtils/testUtils.js';
import { BlocksProvider } from '../../providers/BlocksProvider/BlocksProvider.js';
import { Alert } from './Alert.js';

const intentTheme: Theme = {
  ...testingTheme,
  components: {
    ...testingTheme.components,
    alert: {
      root: 'alert-root',
      variants: {
        intent: {
          danger: 'alert-intent-danger',
          info: 'alert-intent-info',
          success: 'alert-intent-success',
          warning: 'alert-intent-warning',
        },
      },
    },
  },
};

const withIntentTheme = ({ children }: { children: React.ReactNode }) => (
  <BlocksProvider theme={intentTheme}>{children}</BlocksProvider>
);

describe('Alert', () => {
  it('renders its children in an alert', () => {
    render(<Alert>Something happened</Alert>);

    expect(screen.getByRole('alert')).toHaveTextContent('Something happened');
  });

  it('applies the danger intent style', () => {
    render(<Alert intent="danger">Something failed</Alert>, {
      wrapper: withIntentTheme,
    });

    const alert = screen.getByRole('alert');

    expect(alert).toHaveClass('alert-intent-danger');
    expect(alert).not.toHaveClass('alert-intent-info');
  });

  it('defaults to the info intent', () => {
    render(<Alert>For your information</Alert>, { wrapper: withIntentTheme });

    expect(screen.getByRole('alert')).toHaveClass('alert-intent-info');
  });

  it('no longer accepts the error intent', () => {
    // @ts-expect-error error was renamed to danger
    render(<Alert intent="error">Old intent</Alert>);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
