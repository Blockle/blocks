import { userEvent } from '@testing-library/user-event';
import { StrictMode, useEffect } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  act,
  fireEvent,
  render,
  screen,
  within,
} from '../../../testUtils/testUtils.js';
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

describe('Toast Auto-dismiss', () => {
  let toastApi: ReturnType<typeof useToast>;

  const CaptureToast: React.FC = () => {
    toastApi = useToast();

    return null;
  };

  const renderProvider = () =>
    render(
      <ToastProvider>
        <CaptureToast />
      </ToastProvider>,
    );

  const showToast = (props: Parameters<typeof toastApi.showToast>[0]) => {
    act(() => {
      toastApi.showToast(props);
    });
  };

  const advance = (ms: number) => {
    act(() => {
      vi.advanceTimersByTime(ms);
    });
  };

  const getToast = (text: string) =>
    screen.getByText(text).closest('[role="alert"]') as HTMLElement;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('removes a toast once its duration has run', () => {
    renderProvider();
    showToast({ id: 'saved', children: 'Saved', duration: 1000 });

    advance(999);
    expect(screen.queryByText('Saved')).toBeInTheDocument();

    advance(1);
    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
  });

  it('pauses while the pointer is over any toast', () => {
    renderProvider();
    showToast({ id: 'saved', children: 'Saved', duration: 1000 });
    showToast({ id: 'sent', children: 'Sent', duration: 1000 });

    fireEvent.pointerEnter(getToast('Sent'));
    advance(5000);

    expect(screen.queryByText('Saved')).toBeInTheDocument();
    expect(screen.queryByText('Sent')).toBeInTheDocument();
  });

  it('continues with the time left once the pointer leaves', () => {
    renderProvider();
    showToast({ id: 'saved', children: 'Saved', duration: 1000 });

    advance(600);
    fireEvent.pointerEnter(getToast('Saved'));
    advance(5000);
    fireEvent.pointerLeave(getToast('Saved'));

    advance(399);
    expect(screen.queryByText('Saved')).toBeInTheDocument();

    advance(1);
    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
  });

  it('pauses while focus is inside any toast', () => {
    renderProvider();
    showToast({ id: 'saved', children: 'Saved', duration: 1000 });
    showToast({ id: 'sent', children: 'Sent', duration: 1000 });

    act(() => {
      within(getToast('Sent')).getByRole('button', { name: 'Close' }).focus();
    });
    advance(5000);

    expect(screen.queryByText('Saved')).toBeInTheDocument();
    expect(screen.queryByText('Sent')).toBeInTheDocument();

    act(() => {
      (document.activeElement as HTMLElement).blur();
    });
    advance(1000);

    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
    expect(screen.queryByText('Sent')).not.toBeInTheDocument();
  });

  it('pauses while the page is hidden, but not on window blur', () => {
    const visibilityState = vi.spyOn(document, 'visibilityState', 'get');

    renderProvider();
    showToast({ id: 'saved', children: 'Saved', duration: 1000 });

    act(() => {
      window.dispatchEvent(new Event('blur'));
    });
    advance(400);

    visibilityState.mockReturnValue('hidden');
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });
    advance(5000);

    expect(screen.queryByText('Saved')).toBeInTheDocument();

    visibilityState.mockReturnValue('visible');
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });
    advance(600);

    expect(screen.queryByText('Saved')).not.toBeInTheDocument();

    visibilityState.mockRestore();
  });

  it('starts counting down a toast added while paused once the stack resumes', () => {
    renderProvider();
    showToast({ id: 'saved', children: 'Saved' });
    fireEvent.pointerEnter(getToast('Saved'));

    showToast({ id: 'sent', children: 'Sent', duration: 1000 });
    advance(5000);
    fireEvent.pointerLeave(getToast('Saved'));

    advance(999);
    expect(screen.queryByText('Sent')).toBeInTheDocument();

    advance(1);
    expect(screen.queryByText('Sent')).not.toBeInTheDocument();
  });

  it('runs the new duration when a toast is shown again with the same id', () => {
    renderProvider();
    showToast({ id: 'saved', children: 'Saving', duration: 1000 });

    advance(800);
    showToast({ id: 'saved', children: 'Saved', duration: 2000 });

    advance(1999);
    expect(screen.queryByText('Saved')).toBeInTheDocument();

    advance(1);
    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
  });

  it('keeps a toast shown again with the same id and no duration until closed', () => {
    renderProvider();
    showToast({ id: 'saved', children: 'Saving', duration: 1000 });
    showToast({ id: 'saved', children: 'Saved' });

    advance(5000);

    expect(screen.queryByText('Saved')).toBeInTheDocument();
  });

  it('resumes once a hovered or focused toast is closed', () => {
    renderProvider();
    showToast({ id: 'saved', children: 'Saved', duration: 1000 });
    showToast({ id: 'sent', children: 'Sent' });

    const closeSent = within(getToast('Sent')).getByRole('button', {
      name: 'Close',
    });

    fireEvent.pointerEnter(getToast('Sent'));
    act(() => {
      closeSent.focus();
    });
    fireEvent.click(closeSent);
    advance(1000);

    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
  });

  it('clears the timer of a closed toast', () => {
    renderProvider();
    showToast({ id: 'saved', children: 'Saved', duration: 1000 });

    act(() => {
      toastApi.removeToast('saved');
    });

    expect(vi.getTimerCount()).toBe(0);
  });

  it('clears pending timers when ToastProvider unmounts', () => {
    const { unmount } = renderProvider();
    showToast({ id: 'saved', children: 'Saved', duration: 1000 });

    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });

  it('stays paused when the window loses focus while a toast has it', () => {
    renderProvider();
    showToast({ id: 'saved', children: 'Saved', duration: 1000 });

    const close = screen.getByRole('button', { name: 'Close' });

    act(() => {
      close.focus();
    });
    // A window blur fires focusout with no relatedTarget, and focus stays put
    fireEvent.focusOut(close, { relatedTarget: null });
    advance(5000);

    expect(screen.queryByText('Saved')).toBeInTheDocument();
  });

  it('counts down under StrictMode', () => {
    render(
      <StrictMode>
        <ToastProvider>
          <CaptureToast />
        </ToastProvider>
      </StrictMode>,
    );
    showToast({ id: 'saved', children: 'Saved', duration: 1000 });

    advance(999);
    expect(screen.queryByText('Saved')).toBeInTheDocument();

    advance(1);
    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
  });
});
