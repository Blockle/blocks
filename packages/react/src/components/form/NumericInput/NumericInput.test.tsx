import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { NumericInput } from './NumericInput.js';

describe('NumericInput', () => {
  it('names the step buttons Decrease and Increase by default', () => {
    render(<NumericInput name="amount" />);

    expect(
      screen.getByRole('button', { name: 'Decrease' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Increase' }),
    ).toBeInTheDocument();
  });

  it('uses custom labels for the step buttons', () => {
    render(
      <NumericInput
        name="amount"
        decrementLabel="Verlagen"
        incrementLabel="Verhogen"
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Verlagen' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Verhogen' }),
    ).toBeInTheDocument();
  });

  it('does not pass the label props to the input', () => {
    render(<NumericInput name="amount" decrementLabel="Verlagen" />);

    expect(screen.getByRole('spinbutton')).not.toHaveAttribute(
      'decrementLabel',
    );
  });

  it('steps the value with the step buttons', async () => {
    const user = userEvent.setup();

    render(<NumericInput name="amount" defaultValue={5} />);

    await user.click(screen.getByRole('button', { name: 'Increase' }));
    expect(screen.getByRole('spinbutton')).toHaveValue(6);

    await user.click(screen.getByRole('button', { name: 'Decrease' }));
    await user.click(screen.getByRole('button', { name: 'Decrease' }));
    expect(screen.getByRole('spinbutton')).toHaveValue(4);
  });
});
