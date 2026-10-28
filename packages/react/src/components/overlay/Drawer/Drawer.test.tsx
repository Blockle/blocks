import { userEvent } from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { Drawer } from './Drawer.js';

describe('Drawer', () => {
  it('merges a className with its own classes', () => {
    render(
      <Drawer open onRequestClose={vi.fn()} aria-label="Menu">
        Drawer content
      </Drawer>,
    );

    const ownClassNames = [...screen.getByLabelText('Menu').classList];

    render(
      <Drawer
        open
        onRequestClose={vi.fn()}
        aria-label="Custom menu"
        className="custom"
      >
        Drawer content
      </Drawer>,
    );

    const drawer = screen.getByLabelText('Custom menu');

    expect(ownClassNames.length).toBeGreaterThan(0);
    expect([...drawer.classList]).toEqual([...ownClassNames, 'custom']);
  });

  it('passes a ref to the dialog and still closes on a click outside', async () => {
    const ref = createRef<HTMLDialogElement>();
    const onRequestClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Drawer open onRequestClose={onRequestClose} aria-label="Menu" ref={ref}>
        Drawer content
      </Drawer>,
    );

    expect(ref.current).toBe(screen.getByLabelText('Menu'));

    // useClickOutside listens from the next frame on
    await new Promise(requestAnimationFrame);
    await user.click(document.body);

    expect(onRequestClose).toHaveBeenCalled();
  });

  it('restores focus to the previously focused element when closed', () => {
    const button = document.createElement('button');

    document.body.appendChild(button);
    button.focus();

    const drawer = (open: boolean) => (
      <Drawer open={open} onRequestClose={vi.fn()} aria-label="Menu">
        <button type="button">Inside</button>
      </Drawer>
    );
    const { rerender } = render(drawer(true));

    screen.getByText('Inside').focus();
    rerender(drawer(false));

    expect(document.activeElement).toBe(button);

    document.body.removeChild(button);
  });
});
