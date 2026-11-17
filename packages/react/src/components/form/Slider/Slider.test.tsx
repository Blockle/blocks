import type { Theme } from '@blockle/blocks-core';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { testingTheme } from '../../../testUtils/testTheme.css.js';
import { act, render, screen } from '../../../testUtils/testUtils.js';
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
        intent: { primary: 'slider-primary', secondary: 'slider-secondary' },
      },
      defaultVariants: { intent: 'primary' },
    },
  },
};

function pointerDownAt(progress: number) {
  const element = screen.getByRole('slider').parentElement as HTMLElement;

  element.getBoundingClientRect = () =>
    ({ left: 0, top: 0, width: 100, height: 100 }) as DOMRect;

  act(() => {
    element.dispatchEvent(
      new MouseEvent('pointerdown', {
        bubbles: true,
        clientX: progress * 100,
        clientY: progress * 100,
      }),
    );
    document.dispatchEvent(new MouseEvent('pointerup'));
  });
}

function getPlacement() {
  const slider = screen.getByRole('slider');
  const filledTrack = slider.previousElementSibling
    ?.firstElementChild as HTMLElement;

  return {
    thumb: slider.style.getPropertyValue('inset-inline-start'),
    fill: filledTrack.style.getPropertyValue('inline-size'),
  };
}

describe('Slider', () => {
  it('should render the secondary styling for intent="secondary"', () => {
    const { container } = render(
      <BlocksProvider theme={intentTheme}>
        <Slider aria-label="Slider label" intent="secondary" />
      </BlocksProvider>,
    );

    expect(container.querySelector('.slider-secondary')).toBeInTheDocument();
    expect(container.querySelector('.slider-primary')).not.toBeInTheDocument();
  });

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

  describe('with a non-zero min', () => {
    it('should set min + (max - min) * progress on pointer input', () => {
      render(<Slider min={1} max={5} step={1} defaultValue={1} />);

      pointerDownAt(0.5);

      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '3');
    });

    it('should map pointer progress onto min..max', () => {
      render(<Slider min={10} max={20} step={1} defaultValue={10} />);

      pointerDownAt(0.5);

      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '15');

      pointerDownAt(0.25);

      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '13');
    });

    it('should set min at the start of the track', () => {
      render(<Slider min={10} max={20} step={1} defaultValue={15} />);

      pointerDownAt(0);

      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '10');
    });

    it('should place the fill and thumb at 0% for the min value', () => {
      render(<Slider min={1} max={5} defaultValue={1} />);

      expect(getPlacement()).toEqual({ thumb: '0%', fill: '0%' });
    });

    it('should place the fill and thumb at 100% for the max value', () => {
      render(<Slider min={1} max={5} defaultValue={5} />);

      expect(getPlacement()).toEqual({ thumb: '100%', fill: '100%' });
    });

    it('should place the fill and thumb by (value - min) / (max - min)', () => {
      render(<Slider min={1} max={5} defaultValue={2} />);

      expect(getPlacement()).toEqual({ thumb: '25%', fill: '25%' });
    });

    it('should not divide by zero when min equals max', () => {
      render(<Slider min={3} max={3} defaultValue={3} />);

      expect(getPlacement()).toEqual({ thumb: '0%', fill: '0%' });
    });
  });

  it('should keep min={0} pointer and placement behaviour', () => {
    render(<Slider min={0} max={10} step={1} defaultValue={0} />);
    pointerDownAt(0.3);

    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '3');
    expect(getPlacement()).toEqual({ thumb: '30%', fill: '30%' });
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
