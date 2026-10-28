import { afterEach, describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';

import { emulateColorScheme } from '../../../testUtils/browser/emulateColorScheme.js';
import { render } from '../../../testUtils/browser/render.js';
import { TextInput } from './TextInput.js';

// momotaro surface.raised: white in light, neutral-800 (#3C3C3C) in dark
const lightSurface = 'rgb(255, 255, 255)';
const darkSurface = 'rgb(60, 60, 60)';
// momotaro text.default: neutral-900 (#1A1A1A) in light, neutral-100 (#F7F7F7) in dark
const lightText = 'rgb(26, 26, 26)';
const darkText = 'rgb(247, 247, 247)';
// momotaro text.muted: neutral-700 (#5E5E5E) in light, neutral-400 (#B1B1B1) in dark
const lightMuted = 'rgb(94, 94, 94)';
const darkMuted = 'rgb(177, 177, 177)';
// momotaro focusRing.color: #8660FF in light, #A8EEF6 in dark
const lightFocus = 'rgb(134, 96, 255)';
const darkFocus = 'rgb(168, 238, 246)';

const modes = [
  [
    'light',
    {
      surface: lightSurface,
      text: lightText,
      muted: lightMuted,
      focus: lightFocus,
    },
  ],
  [
    'dark',
    {
      surface: darkSurface,
      text: darkText,
      muted: darkMuted,
      focus: darkFocus,
    },
  ],
] as const;

describe('TextInput colors (browser)', () => {
  afterEach(async () => {
    await emulateColorScheme('light');
  });

  it.each(
    modes,
  )('uses surface and text roles in %s mode', async (colorMode, expected) => {
    const screen = await render(
      <TextInput name="email" aria-label="Email" defaultValue="hi" />,
      { colorMode },
    );
    const input = screen.getByRole('textbox').element();
    const root = input.parentElement as HTMLElement;

    expect(getComputedStyle(root).backgroundColor).toBe(expected.surface);
    expect(getComputedStyle(input).color).toBe(expected.text);
  });

  it.each(
    modes,
  )('uses the muted text role for the placeholder in %s mode', async (colorMode, expected) => {
    const screen = await render(
      <TextInput
        name="email"
        aria-label="Email"
        placeholder="you@example.com"
      />,
      { colorMode },
    );
    const input = screen.getByRole('textbox').element();

    expect(getComputedStyle(input, '::placeholder').color).toBe(expected.muted);
  });

  it.each(
    modes,
  )('shows the focus ring role as outline in %s mode', async (colorMode, expected) => {
    const screen = await render(<TextInput name="email" aria-label="Email" />, {
      colorMode,
    });
    const input = screen.getByRole('textbox').element();
    const root = input.parentElement as HTMLElement;

    await userEvent.tab();

    const style = getComputedStyle(root);

    expect(style.outlineStyle).toBe('solid');
    expect(style.outlineColor).toBe(expected.focus);
  });
});
