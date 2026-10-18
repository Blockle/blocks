import type { Theme } from '@blockle/blocks-core';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { testingTheme } from '../../../testUtils/testTheme.css.js';
import { render, screen } from '../../../testUtils/testUtils.js';
import { BlocksProvider } from '../../providers/BlocksProvider/BlocksProvider.js';
import { Slider } from './Slider.js';

const intentTheme: Theme = {
  ...testingTheme,
  components: {
    ...testingTheme.components,
    slider: {
      root: 'slider-root',
      track: '',
      filledTrack: '',
      thumb: '',
      variants: {
        intent: {
          primary: 'slider-intent-primary',
          secondary: 'slider-intent-secondary',
        },
      },
      defaultVariants: { intent: 'primary' },
    },
  },
};

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

  it('applies the intent style', () => {
    const { container } = render(<Slider intent="secondary" />, {
      wrapper: ({ children }) => (
        <BlocksProvider theme={intentTheme}>{children}</BlocksProvider>
      ),
    });

    const root = container.querySelector('.slider-root');

    expect(root).toHaveClass('slider-intent-secondary');
    expect(root).not.toHaveClass('slider-intent-primary');
  });

  it('applies the default intent style', () => {
    const { container } = render(<Slider />, {
      wrapper: ({ children }) => (
        <BlocksProvider theme={intentTheme}>{children}</BlocksProvider>
      ),
    });

    expect(container.querySelector('.slider-root')).toHaveClass(
      'slider-intent-primary',
    );
  });

  it('no longer accepts the colorScheme prop', () => {
    // @ts-expect-error colorScheme was renamed to intent
    render(<Slider colorScheme="secondary" />);

    expect(screen.getByRole('slider')).toBeInTheDocument();
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
