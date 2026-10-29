import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { Alert } from './Alert.js';

describe('Alert', () => {
  it('names the close button "Close" by default', () => {
    render(<Alert onRequestClose={() => {}}>Saved</Alert>);

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('names the close button with closeLabel', () => {
    render(
      <Alert closeLabel="Sluiten" onRequestClose={() => {}}>
        Opgeslagen
      </Alert>,
    );

    expect(screen.getByRole('button', { name: 'Sluiten' })).toBeInTheDocument();
  });

  it('calls onRequestClose when the close button is clicked', async () => {
    const onRequestClose = vi.fn();

    render(<Alert onRequestClose={onRequestClose}>Saved</Alert>);

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });
});
