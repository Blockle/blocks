import { render } from './render.js';

/** Resolves a CSS `var(--x)` reference to a computed rgb() string. */
export async function resolve(cssVar: string, colorMode: 'light' | 'dark') {
  const screen = await render(
    <div data-testid="probe" style={{ color: cssVar }} />,
    {
      colorMode,
    },
  );
  const color = getComputedStyle(screen.getByTestId('probe').element()).color;

  await screen.unmount();

  return color;
}

const channels = (rgb: string) =>
  (rgb.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);

function luminance(rgb: string) {
  const [r = 0, g = 0, b = 0] = channels(rgb).map((value) => {
    const c = value / 255;

    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string) {
  const [high = 0, low = 0] = [luminance(a), luminance(b)].sort(
    (x, y) => y - x,
  );

  return (high + 0.05) / (low + 0.05);
}
