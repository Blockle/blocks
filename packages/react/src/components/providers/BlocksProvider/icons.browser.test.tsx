import { momotaro } from '@blockle/blocks-theme-momotaro';
import { useEffect } from 'react';
import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils/browser/render.js';
import { ToastProvider } from '../../feedback/Toast/ToastProvider.js';
import { useToast } from '../../feedback/Toast/useToast.js';
import { Checkbox } from '../../form/Checkbox/Checkbox.js';
import { NumericInput } from '../../form/NumericInput/NumericInput.js';
import { Select } from '../../form/Select/Select.js';
import { type BlocksIcons, BlocksProvider } from './BlocksProvider.js';

// An icon as a library might draw it: a fixed 48px size and its own stroke
const oversized = (name: string) => (
  <svg
    data-testid={name}
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    aria-hidden="true"
  >
    <path d="M4 4h16v16H4z" />
  </svg>
);

const icons: BlocksIcons = {
  check: oversized('check'),
  chevronDown: oversized('chevronDown'),
  minus: oversized('minus'),
  plus: oversized('plus'),
  close: oversized('close'),
};

const ShowToast: React.FC = () => {
  const { showToast } = useToast();

  useEffect(() => {
    showToast({ id: 'saved', children: 'Saved' });
  }, [showToast]);

  return null;
};

const renderWithIcons = (ui: React.ReactNode) =>
  render(
    <BlocksProvider theme={momotaro} icons={icons}>
      {ui}
    </BlocksProvider>,
  );

const sizeOf = (element: Element) => {
  const { width, height } = element.getBoundingClientRect();

  return { width, height };
};

describe('BlocksProvider icons (browser)', () => {
  it('renders a custom check at the Checkbox icon size', async () => {
    const screen = await renderWithIcons(
      <Checkbox defaultChecked>Agree</Checkbox>,
    );

    expect(sizeOf(screen.getByTestId('check').element())).toEqual({
      width: 16,
      height: 16,
    });
  });

  it('renders a custom chevron at the Select icon size', async () => {
    const screen = await renderWithIcons(
      <Select aria-label="Fruit">
        <option>Apple</option>
      </Select>,
    );

    expect(sizeOf(screen.getByTestId('chevronDown').element())).toEqual({
      width: 16,
      height: 16,
    });
  });

  it("renders custom step icons at a small IconButton's icon size", async () => {
    const screen = await renderWithIcons(<NumericInput label="Amount" />);

    for (const name of ['minus', 'plus']) {
      expect(sizeOf(screen.getByTestId(name).element())).toEqual({
        width: 20,
        height: 20,
      });
    }
  });

  it("renders a custom close icon at a small IconButton's icon size", async () => {
    const screen = await renderWithIcons(
      <ToastProvider>
        <ShowToast />
      </ToastProvider>,
    );

    // Polled, since the Toast scales in as it enters
    await expect
      .poll(() => sizeOf(screen.getByTestId('close').element()))
      .toEqual({
        width: 20,
        height: 20,
      });
  });

  it('gives a custom icon the text color of its control', async () => {
    const screen = await renderWithIcons(<NumericInput label="Amount" />);
    const button = screen.getByRole('button', { name: 'Increase' }).element();
    const svg = screen.getByTestId('plus').element();

    expect(getComputedStyle(svg).color).toBe(getComputedStyle(button).color);
    expect(getComputedStyle(svg).strokeWidth).toBe('3px');
  });
});
