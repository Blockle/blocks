import type { Theme } from '@blockle/blocks-core';
import { act, render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Portal } from '../../components/overlay/Portal/Portal.js';
import { BlocksProvider } from '../../components/providers/BlocksProvider/BlocksProvider.js';
import { useColorMode } from './useColorMode.js';

const theme: Theme = { vars: 'mock-vars', name: 'mock-theme', components: {} };

const Probe = () => {
  const { colorMode, resolvedColorMode } = useColorMode();

  return <output>{`${colorMode}/${resolvedColorMode}`}</output>;
};

type Listener = () => void;

const mockMatchMedia = (initialDark: boolean) => {
  let dark = initialDark;
  const listeners = new Set<Listener>();

  const matchMedia = vi.fn((query: string) => ({
    get matches() {
      return query.includes('dark') && dark;
    },
    media: query,
    addEventListener: (_: string, listener: Listener) => {
      listeners.add(listener);
    },
    removeEventListener: (_: string, listener: Listener) => {
      listeners.delete(listener);
    },
  }));

  vi.stubGlobal('matchMedia', matchMedia);

  return {
    listeners,
    matchMedia,
    setDark: (value: boolean) => {
      dark = value;
      act(() => {
        for (const listener of [...listeners]) {
          listener();
        }
      });
    },
  };
};

describe('useColorMode', () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.each(['light', 'dark'] as const)('returns %s for both values', (mode) => {
    const { getByText } = render(
      <BlocksProvider theme={theme} colorMode={mode}>
        <Probe />
      </BlocksProvider>,
    );

    expect(getByText(`${mode}/${mode}`)).toBeInTheDocument();
  });

  it('follows matchMedia under system and updates on change', () => {
    const media = mockMatchMedia(false);
    const { getByText } = render(
      <BlocksProvider theme={theme} colorMode="system">
        <Probe />
      </BlocksProvider>,
    );

    expect(getByText('system/light')).toBeInTheDocument();

    media.setDark(true);

    expect(getByText('system/dark')).toBeInTheDocument();

    media.setDark(false);

    expect(getByText('system/light')).toBeInTheDocument();
  });

  it('reads the outermost provider inside a Portal', () => {
    const { getByText } = render(
      <BlocksProvider theme={theme} colorMode="dark">
        <Portal>
          <Probe />
        </Portal>
      </BlocksProvider>,
    );

    expect(getByText('dark/dark')).toBeInTheDocument();
  });

  it('removes the listener on unmount', () => {
    const media = mockMatchMedia(false);
    const { unmount } = render(
      <BlocksProvider theme={theme} colorMode="system">
        <Probe />
      </BlocksProvider>,
    );

    expect(media.listeners.size).toBeGreaterThan(0);

    unmount();

    expect(media.listeners.size).toBe(0);
  });

  it('does not listen when the mode is not system', () => {
    const media = mockMatchMedia(false);

    render(
      <BlocksProvider theme={theme} colorMode="dark">
        <Probe />
      </BlocksProvider>,
    );

    expect(media.listeners.size).toBe(0);
  });

  it('renders on the server with a stable default', () => {
    const media = mockMatchMedia(true);

    const html = renderToString(
      <BlocksProvider theme={theme} colorMode="system">
        <Probe />
      </BlocksProvider>,
    );

    expect(html).toContain('system/light');
    expect(media.matchMedia).not.toHaveBeenCalled();
  });

  it('throws outside a BlocksProvider', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<Probe />)).toThrow(/BlocksProvider/);

    error.mockRestore();
  });
});
