import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './Button.stories';

const { Default: Button } = composeStories(stories);

describe('Button', () => {
  it('should render with storybook', () => {
    render(<Button />);

    expect(screen.getByText('Button')).toBeInTheDocument();
  });
});
