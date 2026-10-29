import { vars } from '@blockle/blocks-core';
import { useEffect } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { resolve } from '../../../testUtils/browser/contrast.js';
import { emulateColorScheme } from '../../../testUtils/browser/emulateColorScheme.js';
import { render } from '../../../testUtils/browser/render.js';
import type { AlertProps } from '../Alert/Alert.js';
import { ToastProvider } from './ToastProvider.js';
import { useToast } from './useToast.js';

const intents = [
  ['danger', vars.colorRole.danger],
  ['info', vars.colorRole.info],
  ['success', vars.colorRole.success],
  ['warning', vars.colorRole.warning],
] as const;

const ShowToast: React.FC<{ intent: AlertProps['intent'] }> = ({ intent }) => {
  const { showToast } = useToast();

  useEffect(() => {
    showToast({ id: 'sample', children: 'Saved', intent });
  }, [showToast, intent]);

  return null;
};

const renderToast = (
  intent: AlertProps['intent'],
  colorMode: 'light' | 'dark' | 'system',
) =>
  render(
    <ToastProvider>
      <ShowToast intent={intent} />
    </ToastProvider>,
    { colorMode },
  );

/** Toasts are added from an effect, inside a view transition. */
const findAlert = () =>
  vi.waitFor(() => {
    const alert = document.querySelector('[role="alert"]');

    if (!alert) {
      throw new Error('No toast rendered yet');
    }

    return alert;
  });

const expectedColors = async (
  roles: (typeof intents)[number][1],
  mode: 'light' | 'dark',
) => ({
  background: await resolve(roles.subtle, mode),
  text: await resolve(roles.foreground, mode),
  border: await resolve(roles.border, mode),
});

describe('Toast colors (browser)', () => {
  afterEach(async () => {
    await emulateColorScheme('light');
  });

  for (const mode of ['light', 'dark'] as const) {
    for (const [intent, roles] of intents) {
      it(`renders the ${intent} Alert with its intent roles in ${mode} mode`, async () => {
        const expected = await expectedColors(roles, mode);
        await renderToast(intent, mode);

        const style = getComputedStyle(await findAlert());

        expect(style.backgroundColor).toBe(expected.background);
        expect(style.color).toBe(expected.text);
        expect(style.borderTopColor).toBe(expected.border);
      });
    }
  }

  it('follows the OS preference under system', async () => {
    const [, roles] = intents[0];
    const light = await expectedColors(roles, 'light');
    const dark = await expectedColors(roles, 'dark');

    await emulateColorScheme('dark');

    await renderToast('danger', 'system');

    const alert = await findAlert();

    expect(getComputedStyle(alert).backgroundColor).toBe(dark.background);
    expect(getComputedStyle(alert).color).toBe(dark.text);

    await emulateColorScheme('light');

    expect(getComputedStyle(alert).backgroundColor).toBe(light.background);
    expect(getComputedStyle(alert).color).toBe(light.text);
  });
});
