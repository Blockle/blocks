import { useEffect, useRef } from 'react';
import { describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';

import { render } from '../../../testUtils/browser/render.js';
import { Switch } from './Switch.js';

const wrappingText =
  'A criterion long enough to wrap onto a second line. '.repeat(3);

// momotaro slides the thumb 20px to the right when the switch is on
const thumbOn = 'matrix(1, 0, 0, 1, 20, 0)';
const thumbOff = 'matrix(0.9, 0, 0, 0.9, 0, 0)';

function getThumb(input: HTMLElement) {
  const thumb = input.nextElementSibling;

  if (!thumb) {
    throw new Error('Switch input has no thumb');
  }

  return thumb;
}

// Polls past the thumb's transition until it settles
function expectThumb(input: HTMLElement, transform: string) {
  return expect
    .poll(() => getComputedStyle(getThumb(input)).transform)
    .toBe(transform);
}

// Sets `checked` through the ref after mount, as react-hook-form's `register`
// does with `defaultValues`
const CheckedThroughRef: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.checked = true;
    }
  }, []);

  return <Switch aria-label="Notify" ref={ref} />;
};

describe('Switch (browser)', () => {
  it('keeps its size in a flex row beside text that wraps', async () => {
    const screen = await render(
      <div style={{ display: 'flex', inlineSize: 200 }}>
        <Switch aria-label="Long" />
        <span>{wrappingText}</span>
      </div>,
    );

    const root = screen.getByRole('switch').element().parentElement;

    // momotaro sizes the switch at 52×32
    expect(root?.offsetWidth).toBe(52);
    expect(root?.offsetHeight).toBe(32);
  });

  it('looks on when its input is checked through the ref after mount', async () => {
    const screen = await render(<CheckedThroughRef />);
    const input = screen.getByRole('switch').element() as HTMLInputElement;

    expect(input.checked).toBe(true);
    await expectThumb(input, thumbOn);
  });

  it('follows its input when checked is set through the ref later', async () => {
    const screen = await render(<Switch aria-label="Notify" />);
    const input = screen.getByRole('switch').element() as HTMLInputElement;

    await expectThumb(input, thumbOff);

    // As react-hook-form's `setValue()` and `reset()` do
    input.checked = true;
    await expectThumb(input, thumbOn);

    input.checked = false;
    await expectThumb(input, thumbOff);
  });

  it('looks on again after a form reset restores defaultChecked', async () => {
    const screen = await render(
      <form>
        <Switch aria-label="Notify" defaultChecked />
      </form>,
    );
    const input = screen.getByRole('switch').element() as HTMLInputElement;

    const track = input.parentElement;

    if (!track) {
      throw new Error('Switch input has no track');
    }

    await userEvent.click(track);
    await expectThumb(input, thumbOff);

    input.form?.reset();

    expect(input.checked).toBe(true);
    await expectThumb(input, thumbOn);
  });
});
