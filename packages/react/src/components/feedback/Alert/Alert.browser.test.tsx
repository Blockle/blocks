import { afterEach, describe, expect, it } from 'vitest';

import { emulateColorScheme } from '../../../testUtils/browser/emulateColorScheme.js';
import { render } from '../../../testUtils/browser/render.js';
import { Alert } from './Alert.js';

// momotaro info roles: subtle / foreground / border
const light = {
  backgroundColor: 'rgb(225, 240, 255)', // info-100
  color: 'rgb(26, 102, 204)', // info-700
  borderColor: 'rgb(144, 196, 255)', // info-300
};
const dark = {
  backgroundColor: 'rgb(5, 51, 102)', // info-900
  color: 'rgb(144, 196, 255)', // info-300
  borderColor: 'rgb(26, 102, 204)', // info-700
};

function read(element: Element) {
  const { backgroundColor, color, borderColor } = getComputedStyle(element);

  return { backgroundColor, color, borderColor };
}

describe('Alert intent roles (browser)', () => {
  afterEach(async () => {
    await emulateColorScheme('light');
  });

  it('renders the info intent roles in light mode', async () => {
    const screen = await render(<Alert intent="info">Heads up</Alert>, {
      colorMode: 'light',
    });

    expect(read(screen.getByRole('alert').element())).toEqual(light);
  });

  it('renders the info intent roles in dark mode', async () => {
    const screen = await render(<Alert intent="info">Heads up</Alert>, {
      colorMode: 'dark',
    });

    expect(read(screen.getByRole('alert').element())).toEqual(dark);
  });
});
