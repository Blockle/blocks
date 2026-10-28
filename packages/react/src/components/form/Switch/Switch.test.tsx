import { userEvent } from '@testing-library/user-event';
import { StrictMode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { Label } from '../Label/Label.js';
import { Switch } from './Switch.js';

// The track is the element wrapping the input
function getTrack(input: HTMLElement) {
  const track = input.parentElement;

  if (!track) {
    throw new Error('Switch input has no track');
  }

  return track;
}

describe('Switch', () => {
  it('has the switch role, named by its label', () => {
    render(
      <>
        <Label htmlFor="show-archived">Show archived</Label>
        <Switch id="show-archived" defaultChecked />
      </>,
    );

    expect(
      screen.getByRole('switch', { name: 'Show archived', checked: true }),
    ).toBeInTheDocument();
  });

  it('calls onChange once with the change event when the track is clicked', async () => {
    const onChange = vi.fn(
      (event: React.ChangeEvent<HTMLInputElement>) => event.target.checked,
    );
    const user = userEvent.setup();

    render(
      <StrictMode>
        <Switch aria-label="Notify" onChange={onChange} />
      </StrictMode>,
    );

    const input = screen.getByRole('switch', { name: 'Notify' });

    await user.click(getTrack(input));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.results[0]?.value).toBe(true);
    expect(input).toBeChecked();
  });

  it('toggles once when its label is clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <StrictMode>
        <Label htmlFor="notify">Notify</Label>
        <Switch id="notify" onChange={onChange} />
      </StrictMode>,
    );

    await user.click(screen.getByText('Notify'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('switch', { name: 'Notify' })).toBeChecked();
  });

  it('toggles once when Space is pressed on the focused input', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <StrictMode>
        <Switch aria-label="Notify" onChange={onChange} />
      </StrictMode>,
    );

    await user.tab();
    await user.keyboard(' ');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('switch', { name: 'Notify' })).toBeChecked();
  });

  it('stays as its checked prop says when controlled', async () => {
    const onChange = vi.fn(
      (event: React.ChangeEvent<HTMLInputElement>) => event.target.checked,
    );
    const user = userEvent.setup();
    const { rerender } = render(
      <Switch aria-label="Notify" checked={false} onChange={onChange} />,
    );
    const input = screen.getByRole('switch', { name: 'Notify' });

    await user.click(getTrack(input));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.results[0]?.value).toBe(true);
    expect(input).not.toBeChecked();
    expect(getTrack(input)).toHaveAttribute('data-checked', 'false');

    rerender(<Switch aria-label="Notify" checked onChange={onChange} />);

    expect(input).toBeChecked();
    expect(getTrack(input)).toHaveAttribute('data-checked', 'true');
  });

  it('keeps its own state when uncontrolled', async () => {
    const user = userEvent.setup();

    render(<Switch aria-label="Notify" defaultChecked />);

    const input = screen.getByRole('switch', { name: 'Notify' });

    await user.click(input);

    expect(input).not.toBeChecked();
    expect(getTrack(input)).toHaveAttribute('data-checked', 'false');
  });
});
