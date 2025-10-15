import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import * as stories from './Slider.stories.js';

const { Default: Slider } = composeStories(stories);

describe('Slider', () => {
  it('should render', () => {
    render(<Slider aria-label="Slider label" />);

    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByLabelText('Slider label')).toBeInTheDocument();
  });

  it('should render with vertical orientation', () => {
    render(<Slider aria-label="Slider label" />);

    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByLabelText('Slider label')).toBeInTheDocument();
  });

  it('should render with correct aria attributes', () => {
    render(
      <Slider aria-label="Slider label" min={0} max={100} defaultValue={50} />,
    );

    const slider = screen.getByRole('slider');

    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
  });

  it('should render precision', () => {
    render(<Slider defaultValue={1.2345567} step={0.001} />);

    const slider = screen.getByRole('slider');

    expect(slider).toHaveAttribute('aria-valuenow', '1.235');
  });

  // TODO Fix me
  it.skip('should handle keyboard events', async () => {
    const user = userEvent.setup();

    render(<Slider defaultValue={5} min={0} max={10} step={1} />);

    const slider = screen.getByRole('slider');

    expect(slider).toHaveAttribute('aria-valuenow', '5');

    // await user.click(slider);
    // How to trigger the event from a specific element?
    await user.keyboard('{ArrowLeft}');

    expect(slider).toHaveAttribute('aria-valuenow', '6');
  });
});
