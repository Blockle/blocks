import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './Slider.stories.js';

const { Default: Slider } = composeStories(stories);

describe('Slider', () => {
  it('should render with storybook', () => {
    render(<Slider aria-label="Numberzzzz?" />);

    expect(screen.getByLabelText('Numberzzzz?')).toBeInTheDocument();
  });
});
