import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { Dialog } from './Dialog.js';

describe('Dialog', () => {
  it('renders correctly when opened', async () => {
    render(
      <Dialog open={true} onRequestClose={vi.fn()} aria-label="Test Dialog">
        <p>Dialog Content</p>
      </Dialog>,
    );

    const dialog = screen.getByLabelText('Test Dialog');
    // getByRole('dialog') is not working with showModal() api?
    expect(dialog).toHaveRole('dialog');
  });

  it('does not render when closed', () => {
    render(
      <Dialog open={false} onRequestClose={vi.fn()} aria-label="Test Dialog">
        <p>Dialog Content</p>
      </Dialog>,
    );

    expect(screen.queryByText('Dialog Content')).not.toBeInTheDocument();
  });

  it('calls onRequestClose when clicking outside', async () => {
    const onRequestClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Dialog
        open={true}
        onRequestClose={onRequestClose}
        aria-label="Test Dialog"
      >
        <p>Dialog Content</p>
      </Dialog>,
    );

    await user.click(document.body);
    expect(onRequestClose).toHaveBeenCalled();
  });

  it('calls onRequestClose when pressing Escape', async () => {
    const onRequestClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Dialog
        open={true}
        onRequestClose={onRequestClose}
        aria-label="Test Dialog"
      >
        <p>Dialog Content</p>
      </Dialog>,
    );

    await user.keyboard('{Escape}');
    expect(onRequestClose).toHaveBeenCalled();
  });

  it('restores focus to the previously focused element when closed', async () => {
    const onRequestClose = vi.fn();
    const button = document.createElement('button');
    button.textContent = 'Focus Me';
    document.body.appendChild(button);
    button.focus();

    render(
      <Dialog
        open={true}
        onRequestClose={onRequestClose}
        aria-label="Test Dialog"
      >
        <p>Dialog Content</p>
      </Dialog>,
    );

    await userEvent.keyboard('{Escape}');
    expect(onRequestClose).toHaveBeenCalled();
    expect(document.activeElement).toBe(button);

    document.body.removeChild(button);
  });
});
