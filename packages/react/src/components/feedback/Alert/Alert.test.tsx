import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { Alert } from './Alert.js';

describe('Alert', () => {
  it('renders with role="alert" by default', () => {
    render(<Alert>Saved</Alert>);

    expect(screen.getByRole('alert')).toHaveTextContent('Saved');
  });

  it('replaces role="alert" with role="status"', () => {
    render(<Alert role="status">This Ticket is archived</Alert>);

    expect(screen.getByRole('status')).toHaveTextContent(
      'This Ticket is archived',
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

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

  it('renders the action after the children and before the close button', () => {
    render(
      <Alert
        role="status"
        action={<button type="button">Restore</button>}
        onRequestClose={() => {}}
      >
        This Ticket is archived
      </Alert>,
    );

    const [restore, close] = screen.getAllByRole('button');

    expect(screen.getByRole('status')).toHaveTextContent(
      /^This Ticket is archived\s*Restore$/,
    );
    expect(restore).toHaveAccessibleName('Restore');
    expect(close).toHaveAccessibleName('Close');
  });
});
