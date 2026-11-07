import {
  choiceGroupVars,
  getNameFromVanillaCSSVar,
} from '@blockle/blocks-core';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { Choice } from './Choice.js';
import { ChoiceGroup } from './ChoiceGroup.js';

describe('ChoiceGroup', () => {
  it('renders a named radiogroup of radios named by children or aria-label', () => {
    render(
      <ChoiceGroup aria-label="View">
        <Choice value="list">List</Choice>
        <Choice value="star" aria-label="Star">
          <svg aria-hidden="true" />
        </Choice>
      </ChoiceGroup>,
    );

    expect(
      screen.getByRole('radiogroup', { name: 'View' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'List' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Star' })).toBeInTheDocument();
  });

  it('names the group through aria-labelledby', () => {
    render(
      <>
        <span id="lbl">Colour</span>
        <ChoiceGroup aria-labelledby="lbl">
          <Choice value="a">A</Choice>
        </ChoiceGroup>
      </>,
    );

    expect(
      screen.getByRole('radiogroup', { name: 'Colour' }),
    ).toBeInTheDocument();
  });

  it('checks the defaultValue and follows clicks when uncontrolled', async () => {
    const onValueChange = vi.fn();

    render(
      <ChoiceGroup
        aria-label="Colour"
        defaultValue="teal"
        onValueChange={onValueChange}
      >
        <Choice value="teal">Teal</Choice>
        <Choice value="red">Red</Choice>
      </ChoiceGroup>,
    );

    expect(screen.getByRole('radio', { name: 'Teal' })).toBeChecked();

    await userEvent.setup().click(screen.getByRole('radio', { name: 'Red' }));

    expect(screen.getByRole('radio', { name: 'Red' })).toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith('red');
  });

  it('shows value until it changes when controlled', async () => {
    const onValueChange = vi.fn();
    const ui = (value: 'teal' | 'red') => (
      <ChoiceGroup
        aria-label="Colour"
        value={value}
        onValueChange={onValueChange}
      >
        <Choice value="teal">Teal</Choice>
        <Choice value="red">Red</Choice>
      </ChoiceGroup>
    );

    const { rerender } = render(ui('teal'));

    await userEvent.setup().click(screen.getByRole('radio', { name: 'Red' }));

    expect(onValueChange).toHaveBeenCalledWith('red');
    expect(screen.getByRole('radio', { name: 'Teal' })).toBeChecked();

    rerender(ui('red'));

    expect(screen.getByRole('radio', { name: 'Red' })).toBeChecked();
  });

  it('submits the value with a form under name', async () => {
    render(
      <form aria-label="form">
        <ChoiceGroup aria-label="Colour" name="color" defaultValue="red">
          <Choice value="teal">Teal</Choice>
          <Choice value="red">Red</Choice>
        </ChoiceGroup>
      </form>,
    );

    const form = screen.getByRole<HTMLFormElement>('form');

    expect(new FormData(form).get('color')).toBe('red');

    await userEvent.setup().click(screen.getByRole('radio', { name: 'Teal' }));

    expect(new FormData(form).get('color')).toBe('teal');
  });

  it('is one native group without a name', async () => {
    render(
      <ChoiceGroup aria-label="Colour" defaultValue="teal">
        <Choice value="teal">Teal</Choice>
        <Choice value="red">Red</Choice>
      </ChoiceGroup>,
    );

    await userEvent.setup().click(screen.getByRole('radio', { name: 'Red' }));

    expect(screen.getByRole('radio', { name: 'Teal' })).not.toBeChecked();
  });

  it('disables every radio when the group is disabled', () => {
    render(
      <ChoiceGroup aria-label="Colour" disabled>
        <Choice value="teal">Teal</Choice>
        <Choice value="red">Red</Choice>
      </ChoiceGroup>,
    );

    expect(screen.getByRole('radio', { name: 'Teal' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'Red' })).toBeDisabled();
  });

  it('disables only the Choice that is disabled', () => {
    render(
      <ChoiceGroup aria-label="Colour">
        <Choice value="teal" disabled>
          Teal
        </Choice>
        <Choice value="red">Red</Choice>
      </ChoiceGroup>,
    );

    expect(screen.getByRole('radio', { name: 'Teal' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'Red' })).toBeEnabled();
  });

  it('marks the group and the radios required', () => {
    render(
      <ChoiceGroup aria-label="Colour" required>
        <Choice value="teal">Teal</Choice>
      </ChoiceGroup>,
    );

    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-required',
      'true',
    );
    expect(screen.getByRole('radio')).toBeRequired();
  });

  it('sets a swatch Choice colour on its item', () => {
    render(
      <ChoiceGroup aria-label="Colour" variant="swatch">
        <Choice value="teal" color="#14b8a6" aria-label="Teal" />
      </ChoiceGroup>,
    );

    const item = screen.getByRole('radio', { name: 'Teal' }).closest('label');

    expect(
      item?.style.getPropertyValue(
        getNameFromVanillaCSSVar(choiceGroupVars.color),
      ),
    ).toBe('#14b8a6');
  });

  it('passes className and style to the group and each Choice', () => {
    render(
      <ChoiceGroup aria-label="Colour" className="g" style={{ gap: 3 }}>
        <Choice value="a" className="c" style={{ opacity: 0.9 }}>
          A
        </Choice>
      </ChoiceGroup>,
    );

    expect(screen.getByRole('radiogroup')).toHaveClass('g');
    expect(screen.getByRole('radiogroup')).toHaveStyle({ gap: '3px' });
    expect(screen.getByRole('radio').closest('label')).toHaveClass('c');
    expect(screen.getByRole('radio').closest('label')).toHaveStyle({
      opacity: '0.9',
    });
  });
});
