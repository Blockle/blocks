import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './Slider.stories';

const { Default } = composeStories(stories);

describe('Slider', () => {
  it('should render with storybook', () => {
    const { getByLabelText } = render(<Default />);

    expect(getByLabelText('How happy are you today?')).toBeInTheDocument();
  });
});
