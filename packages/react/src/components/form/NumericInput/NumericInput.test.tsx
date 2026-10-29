import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

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
    render(
      <NumericInput
        name="amount"
        decrementLabel="Verlagen"
        incrementLabel="Verhogen"
      />,
    );

    const input = screen.getByRole('spinbutton');

    expect(input).not.toHaveAttribute('decrementLabel');
    expect(input).not.toHaveAttribute('incrementLabel');
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

  it('steps by 10 when the step buttons are Shift-clicked', async () => {
    const user = userEvent.setup();

    render(<NumericInput name="amount" defaultValue={5} />);

    await user.keyboard('{Shift>}');
    await user.click(screen.getByRole('button', { name: 'Increase' }));
    expect(screen.getByRole('spinbutton')).toHaveValue(15);

    await user.click(screen.getByRole('button', { name: 'Decrease' }));
    await user.click(screen.getByRole('button', { name: 'Decrease' }));
    expect(screen.getByRole('spinbutton')).toHaveValue(-5);
  });

  it('calls a consumer onKeyDown and still steps by 10 with Shift+arrow', async () => {
    const user = userEvent.setup();
    const onKeyDown = vi.fn();

    render(
      <NumericInput name="amount" defaultValue={5} onKeyDown={onKeyDown} />,
    );

    await user.click(screen.getByRole('spinbutton'));
    await user.keyboard('{Shift>}{ArrowUp}{/Shift}');

    expect(onKeyDown).toHaveBeenCalled();
    expect(screen.getByRole('spinbutton')).toHaveValue(15);

    await user.keyboard('{Shift>}{ArrowDown}{ArrowDown}{/Shift}');

    expect(screen.getByRole('spinbutton')).toHaveValue(-5);
  });

  it('skips Shift+arrow stepping when the consumer onKeyDown prevents default', async () => {
    const user = userEvent.setup();

    render(
      <NumericInput
        name="amount"
        defaultValue={5}
        onKeyDown={(event) => event.preventDefault()}
      />,
    );

    await user.click(screen.getByRole('spinbutton'));
    await user.keyboard('{Shift>}{ArrowUp}{/Shift}');

    expect(screen.getByRole('spinbutton')).toHaveValue(5);
  });

  it('keeps the Decrease button when startSlot is passed anyway', () => {
    // @ts-expect-error The step buttons are NumericInput's own
    render(<NumericInput name="amount" startSlot={<span>start</span>} />);

    expect(
      screen.getByRole('button', { name: 'Decrease' }),
    ).toBeInTheDocument();
  });

  it('keeps the Increase button when endSlot is passed anyway', () => {
    // @ts-expect-error The step buttons are NumericInput's own
    render(<NumericInput name="amount" endSlot={<span>end</span>} />);

    expect(
      screen.getByRole('button', { name: 'Increase' }),
    ).toBeInTheDocument();
  });

  it('keeps a consumer inputClassName on the input', () => {
    render(<NumericInput name="amount" inputClassName="custom" />);

    expect(screen.getByRole('spinbutton')).toHaveClass('custom');
  });
});
