import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './Slider.stories';

const { Default: Slider } = composeStories(stories);

describe('Slider', () => {
  it('should render with storybook', () => {
    render(<Slider aria-label="Numberzzzz?" />);

    expect(screen.getByLabelText('Numberzzzz?')).toBeInTheDocument();
  });
});
