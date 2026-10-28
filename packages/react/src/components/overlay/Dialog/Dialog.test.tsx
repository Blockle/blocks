import { userEvent } from '@testing-library/user-event';
import { createRef } from 'react';
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

    const dialog = screen.getByRole('dialog', { name: 'Test Dialog' });

    expect(dialog).toHaveTextContent('Dialog Content');
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

    // useClickOutside listens from the next frame on
    await new Promise(requestAnimationFrame);
    await user.click(document.body);

    expect(onRequestClose).toHaveBeenCalled();
  });

  it('passes a ref to the dialog and still closes on a click outside', async () => {
    const ref = createRef<HTMLDialogElement>();
    const onRequestClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Dialog
        open={true}
        onRequestClose={onRequestClose}
        aria-label="Test Dialog"
        ref={ref}
      >
        <p>Dialog Content</p>
      </Dialog>,
    );

    expect(ref.current).toBe(screen.getByLabelText('Test Dialog'));

    // useClickOutside listens from the next frame on
    await new Promise(requestAnimationFrame);
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
        <button type="button">Inside</button>
      </Dialog>,
    );

    screen.getByText('Inside').focus();
    await user.keyboard('{Escape}');

    expect(onRequestClose).toHaveBeenCalledWith('escape');
  });

  it('restores focus to the previously focused element when closed', () => {
    const button = document.createElement('button');

    document.body.appendChild(button);
    button.focus();

    const dialog = (open: boolean) => (
      <Dialog open={open} onRequestClose={vi.fn()} aria-label="Test Dialog">
        <button type="button">Inside</button>
      </Dialog>
    );
    const { rerender } = render(dialog(true));

    screen.getByText('Inside').focus();
    rerender(dialog(false));

    expect(document.activeElement).toBe(button);

    document.body.removeChild(button);
  });
});
