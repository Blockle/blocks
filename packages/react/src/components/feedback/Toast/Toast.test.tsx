import { userEvent } from '@testing-library/user-event';
import { useEffect } from 'react';
import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { ToastProvider, type ToastProviderProps } from './ToastProvider.js';
import { useToast } from './useToast.js';

const ShowToast: React.FC = () => {
  const { showToast } = useToast();

  useEffect(() => {
    showToast({ id: 'saved', children: 'Saved' });
  }, [showToast]);

  return null;
};

const renderToast = (props: Omit<ToastProviderProps, 'children'> = {}) =>
  render(
    <ToastProvider {...props}>
      <ShowToast />
    </ToastProvider>,
  );

describe('Toast', () => {
  it('names the close button "Close" by default', async () => {
    renderToast();

    expect(
      await screen.findByRole('button', { name: 'Close' }),
    ).toBeInTheDocument();
  });

  it('names the close button with closeLabel', async () => {
    renderToast({ closeLabel: 'Sluiten' });

    expect(
      await screen.findByRole('button', { name: 'Sluiten' }),
    ).toBeInTheDocument();
  });

  it('removes the Toast when the close button is clicked', async () => {
    renderToast();

    await userEvent.click(await screen.findByRole('button', { name: 'Close' }));

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
