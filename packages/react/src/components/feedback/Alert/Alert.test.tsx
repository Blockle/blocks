import { describe, expect, it } from 'vitest';

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

  it('renders no button of its own', () => {
    render(<Alert>Saved</Alert>);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders the startSlot before the message', () => {
    render(<Alert startSlot={<span>Icon</span>}>Saved</Alert>);

    expect(screen.getByRole('alert')).toHaveTextContent(/^Icon\s*Saved$/);
  });

  it('renders the endSlot after the message', () => {
    render(
      <Alert role="status" endSlot={<button type="button">Restore</button>}>
        This Ticket is archived
      </Alert>,
    );

    expect(screen.getByRole('status')).toHaveTextContent(
      /^This Ticket is archived\s*Restore$/,
    );
    expect(screen.getByRole('button')).toHaveAccessibleName('Restore');
  });

  it('renders both Slots around the message', () => {
    render(
      <Alert startSlot={<span>Icon</span>} endSlot={<span>Undo</span>}>
        Deleted
      </Alert>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      /^Icon\s*Deleted\s*Undo$/,
    );
  });
});
