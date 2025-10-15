import { composeStories } from '@storybook/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../testUtils/testUtils.js';
import type { PopoverProps } from './Popover.js';
import * as stories from './Popover.stories.js';

const { Default: Popover } = composeStories(stories);

describe('Popover', () => {
  const defaultProps: PopoverProps = {
    anchorElement: { current: document.createElement('div') },
    children: <div>Popover Content</div>,
    onRequestClose: vi.fn(),
    open: false,
  };

  it('should not render when open is false', () => {
    render(<Popover {...defaultProps} />);
    expect(screen.queryByText('Popover Content')).toBeNull();
  });

  it('should render when open is true', () => {
    render(<Popover {...defaultProps} open />);
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });

  it('should call onRequestClose when Escape key is pressed', async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} open />);

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(defaultProps.onRequestClose).toHaveBeenCalled();
    });
  });

  // TODO Fix me with userEvent
  // it('should call onRequestClose when clicking outside', () => {
  //   const user = userEvent.setup();
  //   render(<Popover {...defaultProps} open />);
  //   user.click(document.body);
  //   expect(defaultProps.onRequestClose).toHaveBeenCalled();
  // });

  it('should set left and top styles', () => {
    const anchorElement = document.createElement('div');
    document.body.appendChild(anchorElement);
    const popoverProps = {
      ...defaultProps,
      anchorElement: { current: anchorElement },
      open: true,
    };

    render(<Popover {...popoverProps} />);
    const popover = screen.getByText('Popover Content').parentElement;

    expect(popover?.style.top).toBeTruthy();
    expect(popover?.style.left).toBeTruthy();
  });

  it('should hide the popover after animation ends when open is false', () => {
    const { rerender } = render(<Popover {...defaultProps} open />);
    const popover = screen.getByText('Popover Content');

    rerender(<Popover {...defaultProps} open={false} />);

    fireEvent.animationEnd(popover);

    expect(popover).not.toBeInTheDocument();
  });
});
