import type { Theme } from '@blockle/blocks-core';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { testingTheme } from '../../../testUtils/testTheme.css.js';
import { render, screen } from '../../../testUtils/testUtils.js';
import { BlocksProvider } from '../../providers/BlocksProvider/BlocksProvider.js';
import { ToastProvider } from './ToastProvider.js';
import { type ToastProps, useToast } from './useToast.js';

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
        },
      },
    },
  },
};

const ShowToastButton = (toast: ToastProps) => {
  const { showToast } = useToast();

  return (
    <button type="button" onClick={() => showToast(toast)}>
      Show toast
    </button>
  );
};

describe('ToastProvider', () => {
  it('shows a danger toast with the danger intent style', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ShowToastButton intent="danger">Saving failed</ShowToastButton>
      </ToastProvider>,
      {
        wrapper: ({ children }) => (
          <BlocksProvider theme={intentTheme}>{children}</BlocksProvider>
        ),
      },
    );

    await user.click(screen.getByRole('button', { name: 'Show toast' }));

    const toast = screen.getByRole('alert');

    expect(toast).toHaveTextContent('Saving failed');
    expect(toast).toHaveClass('alert-intent-danger');
  });

  it('no longer accepts the error intent', () => {
    // @ts-expect-error error was renamed to danger
    const toast: ToastProps = { intent: 'error' };

    expect(toast.intent).toBe('error');
  });
});
