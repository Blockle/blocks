import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './Button.stories';

const { Default } = composeStories(stories);

describe('Button', () => {
  it('should render with storybook', () => {
    const { getByText } = render(<Default />);

    expect(getByText('Button')).toBeInTheDocument();
  });
});
