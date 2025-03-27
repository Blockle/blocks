import { composeStories } from '@storybook/react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import * as stories from './Dialog.stories';

const { Default: Dialog } = composeStories(stories);

describe.skip('Dialog', () => {
  it('renders correctly when open', async () => {
    render(
      <Dialog open={true} onRequestClose={vi.fn()} aria-label="Test Dialog">
        <p>Dialog Content</p>
      </Dialog>,
    );

    await waitFor(() => {
      expect(screen.getByText('Dialog Content')).toBeInTheDocument();
    });

    expect(
      screen.getByRole('dialog', { name: 'Test Dialog' }),
    ).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Dialog open={false} onRequestClose={vi.fn()} aria-label="Test Dialog">
        <p>Dialog Content</p>
      </Dialog>,
    );

    expect(
      screen.queryByRole('dialog', { name: 'Test Dialog' }),
    ).not.toBeInTheDocument();
  });

  it('calls onRequestClose when clicking outside', async () => {
    const onRequestClose = vi.fn();
    render(
      <Dialog
        open={true}
        onRequestClose={onRequestClose}
        aria-label="Test Dialog"
      >
        <p>Dialog Content</p>
      </Dialog>,
    );

    await userEvent.click(document.body);
    expect(onRequestClose).toHaveBeenCalled();
  });

  it('calls onRequestClose when pressing Escape', async () => {
    const onRequestClose = vi.fn();
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
