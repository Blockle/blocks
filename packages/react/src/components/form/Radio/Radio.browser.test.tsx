import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils/browser/render.js';
import { Radio } from './Radio.js';

const wrappingText =
  'A criterion long enough to wrap onto a second line. '.repeat(3);

describe('Radio (browser)', () => {
  it('keeps its size in a flex row beside text that wraps', async () => {
    const screen = await render(
      <div style={{ display: 'flex', inlineSize: 200 }}>
        <Radio name="r" value="long" aria-label="Long" />
        <span>{wrappingText}</span>
      </div>,
    );

    const root = screen.getByRole('radio').element().parentElement;

    // momotaro sizes the box at 24×24
    expect(root?.offsetWidth).toBe(24);
    expect(root?.offsetHeight).toBe(24);
  });

  it('keeps its size beside a label that wraps', async () => {
    const screen = await render(
      <div style={{ inlineSize: 200 }}>
        <Radio name="r" value="long">
          {wrappingText}
        </Radio>
      </div>,
    );

    const root = screen.getByRole('radio').element().parentElement;

    // momotaro sizes the box at 24×24
    expect(root?.offsetWidth).toBe(24);
    expect(root?.offsetHeight).toBe(24);
  });
});
