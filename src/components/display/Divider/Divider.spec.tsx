import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './Divider.stories';

const { Default: Divider } = composeStories(stories);

describe('Divider', () => {
  it('should render with storybook', () => {
    render(<Divider />);

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
