import { userEvent } from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../testUtils/testUtils.js';
import { Popover, type PopoverProps } from './Popover.js';

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

  it('finds the content of an open popover by role', () => {
    render(
      <Popover {...defaultProps} open>
        <button type="button">Inside</button>
      </Popover>,
    );

    expect(screen.getByRole('button', { name: 'Inside' })).toBeInTheDocument();
  });

  it('warns instead of throwing when closing without the Popover API', () => {
    const { hidePopover } = HTMLElement.prototype;
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    // @ts-expect-error Simulate an environment without the Popover API
    delete HTMLElement.prototype.hidePopover;

    try {
      const { rerender } = render(<Popover {...defaultProps} open />);

      expect(() => {
        rerender(<Popover {...defaultProps} open={false} />);
      }).not.toThrow();
      expect(warn).toHaveBeenCalledWith(
        'Popover: hidePopover method is not available on the element.',
      );
    } finally {
      HTMLElement.prototype.hidePopover = hidePopover;
      warn.mockRestore();
    }
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

  describe('with a passed ref', () => {
    it('gives an object ref the popover element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Popover {...defaultProps} open ref={ref} />);

      expect(ref.current).toBe(
        screen.getByText('Popover Content').parentElement,
      );
    });

    it('gives a callback ref the popover element', () => {
      const ref = vi.fn();
      render(<Popover {...defaultProps} open ref={ref} />);

      expect(ref).toHaveBeenCalledWith(
        screen.getByText('Popover Content').parentElement,
      );
    });

    it('shows and positions the popover', () => {
      const showPopover = vi.spyOn(HTMLElement.prototype, 'showPopover');
      const anchorElement = document.createElement('div');
      document.body.appendChild(anchorElement);

      try {
        render(
          <Popover
            {...defaultProps}
            anchorElement={{ current: anchorElement }}
            open
            ref={createRef()}
          />,
        );
        const popover = screen.getByText('Popover Content').parentElement;

        expect(showPopover).toHaveBeenCalled();
        expect(showPopover.mock.contexts).toContain(popover);
        expect(popover?.style.top).toBeTruthy();
        expect(popover?.style.left).toBeTruthy();
      } finally {
        showPopover.mockRestore();
        anchorElement.remove();
      }
    });

    it('requests to close on a click outside', async () => {
      const user = userEvent.setup();
      const onRequestClose = vi.fn();
      render(
        <Popover
          {...defaultProps}
          onRequestClose={onRequestClose}
          open
          ref={createRef()}
        />,
      );

      // The listeners attach on the next frame
      await new Promise(requestAnimationFrame);
      await user.click(document.body);

      expect(onRequestClose).toHaveBeenCalledWith('outside-click');
    });
  });

  it('should hide the popover after animation ends when open is false', () => {
    const { rerender } = render(<Popover {...defaultProps} open />);
    const popover = screen.getByText('Popover Content');

    rerender(<Popover {...defaultProps} open={false} />);

    fireEvent.animationEnd(popover);

    expect(popover).not.toBeInTheDocument();
  });
});
