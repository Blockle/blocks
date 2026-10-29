import { vars } from '@blockle/blocks-core';
import { useEffect } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { resolve } from '../../../testUtils/browser/contrast.js';
import { emulateColorScheme } from '../../../testUtils/browser/emulateColorScheme.js';
import { render } from '../../../testUtils/browser/render.js';
import type { AlertProps } from '../Alert/Alert.js';
import {
  type ToastPlacement,
  ToastProvider,
  type ToastProviderProps,
} from './ToastProvider.js';
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

const ShowToasts: React.FC<{ ids: string[] }> = ({ ids }) => {
  const { showToast } = useToast();

  useEffect(() => {
    for (const id of ids) {
      showToast({ id, children: `Toast ${id}` });
    }
  }, [showToast, ids]);

  return null;
};

const renderPlaced = (
  props: Omit<ToastProviderProps, 'children'>,
  ids = ['first'],
) =>
  render(
    <ToastProvider {...props}>
      <ShowToasts ids={ids} />
    </ToastProvider>,
  );

/** Finds the toast showing `Toast ${id}`, once its view transition has added it. */
const findToast = (id: string) =>
  vi.waitFor(() => {
    const alert = [...document.querySelectorAll('[role="alert"]')].find(
      (element) => element.textContent?.includes(`Toast ${id}`),
    );

    if (!alert) {
      throw new Error(`No toast ${id} rendered yet`);
    }

    return alert;
  });

/** The stack holding the toasts */
const findStack = async () => {
  const stack = (await findToast('first')).parentElement;

  if (!stack) {
    throw new Error('Toast has no stack');
  }

  return stack;
};

/** The stack's box per the spec: at most 400px wide, flush with the screen's edges. */
const expectedBox = (placement: ToastPlacement) => {
  const [side, edge] = placement.split('-');
  const width = Math.min(window.innerWidth, 400);
  const left =
    edge === 'start'
      ? 0
      : edge === 'end'
        ? window.innerWidth - width
        : (window.innerWidth - width) / 2;

  return { side, left, width };
};

const expectStackAt = (stack: HTMLElement, placement: ToastPlacement) => {
  const box = stack.getBoundingClientRect();
  const { side, left, width } = expectedBox(placement);

  expect(box.width).toBeCloseTo(width, 0);
  expect(box.left).toBeCloseTo(left, 0);

  if (side === 'top') {
    expect(box.top).toBeCloseTo(0, 0);
  } else {
    expect(box.bottom).toBeCloseTo(window.innerHeight, 0);
  }
};

const placements: ToastPlacement[] = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
];

describe('Toast placement (browser)', () => {
  it('places the stack at the bottom by default', async () => {
    await renderPlaced({});

    expectStackAt(await findStack(), 'bottom');
  });

  for (const placement of placements) {
    it(`places the stack at ${placement}`, async () => {
      await renderPlaced({ placement });

      expectStackAt(await findStack(), placement);
    });
  }

  const positions = [
    ['top-left', 'top-start'],
    ['top-center', 'top'],
    ['top-right', 'top-end'],
    ['bottom-left', 'bottom-start'],
    ['bottom-center', 'bottom'],
    ['bottom-right', 'bottom-end'],
  ] as const;

  for (const [position, placement] of positions) {
    it(`maps the deprecated position ${position} to ${placement}`, async () => {
      await renderPlaced({ position });

      expectStackAt(await findStack(), placement);
    });
  }

  it('prefers placement over the deprecated position', async () => {
    await renderPlaced({ placement: 'bottom-end', position: 'top-left' });

    expectStackAt(await findStack(), 'bottom-end');
  });

  it('puts the newest toast nearest the top edge for a top placement', async () => {
    await renderPlaced({ placement: 'top' }, ['first', 'second']);

    const first = await findToast('first');
    const second = await findToast('second');

    expect(second.getBoundingClientRect().top).toBeLessThan(
      first.getBoundingClientRect().top,
    );
  });

  it('puts the newest toast nearest the bottom edge for a bottom placement', async () => {
    await renderPlaced({ placement: 'bottom' }, ['first', 'second']);

    const first = await findToast('first');
    const second = await findToast('second');

    expect(second.getBoundingClientRect().bottom).toBeGreaterThan(
      first.getBoundingClientRect().bottom,
    );
  });
});
