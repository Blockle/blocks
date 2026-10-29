import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils/browser/render.js';
import { Link } from './Link.js';

// momotaro primary.foreground: primary-700 (#4D3CAB) in light
const lightPrimary = 'rgb(77, 60, 171)';
// momotaro neutral.foreground: neutral-800 (#3C3C3C) in light
const lightNeutral = 'rgb(60, 60, 60)';

const styleOf = (element: Element) => getComputedStyle(element);

describe('Link colors (browser)', () => {
  it('defaults to the primary intent', async () => {
    const screen = await render(<Link href="/">Home</Link>, {
      colorMode: 'light',
    });
    const style = styleOf(screen.getByRole('link').element());

    expect(style.color).toBe(lightPrimary);
    expect(style.fontWeight).toBe('500');
  });

  it('uses the primary foreground with intent="primary"', async () => {
    const screen = await render(
      <Link href="/" intent="primary">
        Home
      </Link>,
      { colorMode: 'light' },
    );
    const style = styleOf(screen.getByRole('link').element());

    expect(style.color).toBe(lightPrimary);
    expect(style.fontWeight).toBe('500');
  });

  it('uses the neutral foreground with intent="neutral"', async () => {
    const screen = await render(
      <Link href="/" intent="neutral">
        Home
      </Link>,
      { colorMode: 'light' },
    );
    const style = styleOf(screen.getByRole('link').element());

    expect(style.color).toBe(lightNeutral);
    expect(style.fontWeight).toBe('500');
  });

  it('takes the surrounding color and weight with intent="inherit"', async () => {
    const screen = await render(
      <p style={{ color: 'rgb(0, 128, 0)', fontWeight: 700 }}>
        Read the{' '}
        <Link href="/" intent="inherit">
          docs
        </Link>
      </p>,
    );
    const style = styleOf(screen.getByRole('link').element());

    expect(style.color).toBe('rgb(0, 128, 0)');
    expect(style.fontWeight).toBe('700');
  });
});
