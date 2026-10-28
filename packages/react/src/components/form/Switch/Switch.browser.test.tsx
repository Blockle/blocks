import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils/browser/render.js';
import { Switch } from './Switch.js';

const wrappingText =
  'A criterion long enough to wrap onto a second line. '.repeat(3);

describe('Switch (browser)', () => {
  it('keeps its size in a flex row beside text that wraps', async () => {
    const screen = await render(
      <div style={{ display: 'flex', inlineSize: 200 }}>
        <Switch aria-label="Long" />
        <span>{wrappingText}</span>
      </div>,
    );

    const root = screen.getByRole('checkbox').element().parentElement;

    // momotaro sizes the switch at 52×32
    expect(root?.offsetWidth).toBe(52);
    expect(root?.offsetHeight).toBe(32);
  });
});
