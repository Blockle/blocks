import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';

import { render } from '../../../testUtils/browser/render.js';
import { Choice } from './Choice.js';
import { ChoiceGroup } from './ChoiceGroup.js';

describe('ChoiceGroup (browser)', () => {
  it('is one tab stop, and arrow keys move and check the next item', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <>
        <button type="button">Before</button>
        <ChoiceGroup
          aria-label="Colour"
          defaultValue="a"
          onValueChange={onValueChange}
        >
          <Choice value="a">A</Choice>
          <Choice value="b">B</Choice>
          <Choice value="c">C</Choice>
        </ChoiceGroup>
        <button type="button">After</button>
      </>,
    );

    screen.getByRole('button', { name: 'Before' }).element().focus();

    await userEvent.tab();
    await expect
      .element(screen.getByRole('radio', { name: 'A' }))
      .toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');

    await expect
      .element(screen.getByRole('radio', { name: 'B' }))
      .toHaveFocus();
    await expect
      .element(screen.getByRole('radio', { name: 'B' }))
      .toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith('b');

    await userEvent.tab();
    await expect
      .element(screen.getByRole('button', { name: 'After' }))
      .toHaveFocus();
  });

  it('shows a focus ring on the item after keyboard focus', async () => {
    const screen = await render(
      <ChoiceGroup aria-label="View" defaultValue="a">
        <Choice value="a">A</Choice>
        <Choice value="b">B</Choice>
      </ChoiceGroup>,
    );

    await userEvent.tab();

    const item = screen
      .getByRole('radio', { name: 'A' })
      .element()
      .closest('label');

    expect(item).not.toBeNull();
    expect(getComputedStyle(item as HTMLElement).outlineStyle).toBe('solid');
    expect(getComputedStyle(item as HTMLElement).outlineWidth).toBe('2px');
  });

  it('paints a swatch with its colour', async () => {
    const screen = await render(
      <ChoiceGroup aria-label="Colour" variant="swatch">
        <Choice value="teal" color="rgb(20, 184, 166)" aria-label="Teal" />
      </ChoiceGroup>,
    );

    const swatch = screen
      .getByRole('radio', { name: 'Teal' })
      .element()
      .closest('label')
      ?.querySelector('span');

    expect(getComputedStyle(swatch as HTMLElement).backgroundColor).toBe(
      'rgb(20, 184, 166)',
    );
  });

  it('draws the checked button differently from an unchecked one', async () => {
    const screen = await render(
      <ChoiceGroup aria-label="View" defaultValue="a">
        <Choice value="a">A</Choice>
        <Choice value="b">B</Choice>
      </ChoiceGroup>,
    );

    const background = (name: string) =>
      getComputedStyle(
        screen
          .getByRole('radio', { name })
          .element()
          .closest('label') as HTMLElement,
      ).backgroundColor;

    expect(background('A')).not.toBe(background('B'));
  });
});
