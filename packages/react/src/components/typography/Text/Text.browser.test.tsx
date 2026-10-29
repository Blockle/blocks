import { afterEach, describe, expect, it } from 'vitest';

import { emulateColorScheme } from '../../../testUtils/browser/emulateColorScheme.js';
import { render } from '../../../testUtils/browser/render.js';
import { Inline } from '../../layout/Inline/Inline.js';
import { Text } from './Text.js';

// momotaro text.default: neutral-900 (#1A1A1A) in light, neutral-100 (#F7F7F7) in dark
const lightDefault = 'rgb(26, 26, 26)';
const darkDefault = 'rgb(247, 247, 247)';
// momotaro text.muted: neutral-700 (#5E5E5E) in light, neutral-400 (#B1B1B1) in dark
const lightMuted = 'rgb(94, 94, 94)';
const darkMuted = 'rgb(177, 177, 177)';

const colorOf = (element: Element) => getComputedStyle(element).color;

describe('Text color roles (browser)', () => {
  afterEach(async () => {
    await emulateColorScheme('light');
  });

  it('renders text.default in light mode', async () => {
    const screen = await render(<Text>Hello</Text>, { colorMode: 'light' });

    expect(colorOf(screen.getByText('Hello').element())).toBe(lightDefault);
  });

  it('renders the dark text.default value in dark mode', async () => {
    const screen = await render(<Text>Hello</Text>, { colorMode: 'dark' });

    expect(colorOf(screen.getByText('Hello').element())).toBe(darkDefault);
  });

  it('maps the color prop to a text role', async () => {
    const screen = await render(<Text color="muted">Hello</Text>, {
      colorMode: 'dark',
    });

    expect(colorOf(screen.getByText('Hello').element())).toBe(darkMuted);
  });

  it('keeps a palette shade fixed in every mode', async () => {
    const screen = await render(<Text color="primary-700">Hello</Text>, {
      colorMode: 'dark',
    });

    expect(colorOf(screen.getByText('Hello').element())).toBe(
      'rgb(77, 60, 171)',
    );
  });

  it('follows the emulated OS preference under system, including live switches', async () => {
    await emulateColorScheme('light');

    const screen = await render(
      <>
        <Text>Hello</Text>
        <Text color="muted">Quiet</Text>
      </>,
      { colorMode: 'system' },
    );
    const hello = screen.getByText('Hello').element();
    const quiet = screen.getByText('Quiet').element();

    expect(colorOf(hello)).toBe(lightDefault);
    expect(colorOf(quiet)).toBe(lightMuted);

    await emulateColorScheme('dark');

    expect(colorOf(hello)).toBe(darkDefault);
    expect(colorOf(quiet)).toBe(darkMuted);

    await emulateColorScheme('light');

    expect(colorOf(hello)).toBe(lightDefault);
  });
});

const longText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(20);

const lineCount = (element: HTMLElement) =>
  Math.round(
    element.getBoundingClientRect().height /
      Number.parseFloat(getComputedStyle(element).lineHeight),
  );

describe('Text overflow (browser)', () => {
  it('clamps to the given number of lines with an ellipsis', async () => {
    const screen = await render(
      <div style={{ inlineSize: 200 }}>
        <Text lineClamp={2} lineHeight="normal">
          {longText}
        </Text>
      </div>,
    );
    const element = screen.getByText(longText.trim()).element() as HTMLElement;
    const style = getComputedStyle(element);

    expect(lineCount(element)).toBe(2);
    expect(element.scrollHeight).toBeGreaterThan(element.clientHeight);
    expect(style.overflow).toBe('hidden');
    expect(style.webkitLineClamp).toBe('2');
  });

  it('truncates a span to one line with an ellipsis', async () => {
    const screen = await render(
      <div style={{ inlineSize: 200 }}>
        <Text truncate lineHeight="normal">
          {longText}
        </Text>
      </div>,
    );
    const element = screen.getByText(longText.trim()).element() as HTMLElement;
    const style = getComputedStyle(element);

    expect(element.tagName).toBe('SPAN');
    expect(lineCount(element)).toBe(1);
    expect(element.getBoundingClientRect().width).toBe(200);
    expect(element.scrollWidth).toBeGreaterThan(element.clientWidth);
    expect(style.display).toBe('block');
    expect(style.textOverflow).toBe('ellipsis');
  });

  it('lets a truncated Text shrink inside an Inline with minInlineSize 0', async () => {
    const screen = await render(
      <div style={{ display: 'flex', inlineSize: 200 }}>
        <Inline gap={2} flexWrap="nowrap" minInlineSize={0}>
          <Text>Blocks</Text>
          <Text truncate>{longText}</Text>
        </Inline>
      </div>,
    );
    const element = screen.getByText(longText.trim()).element() as HTMLElement;
    const inline = element.parentElement as HTMLElement;

    expect(getComputedStyle(inline).minInlineSize).toBe('0px');
    expect(inline.getBoundingClientRect().width).toBe(200);
    expect(element.getBoundingClientRect().right).toBeLessThanOrEqual(
      inline.getBoundingClientRect().right,
    );
    expect(element.scrollWidth).toBeGreaterThan(element.clientWidth);
  });
});
