import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './Checkbox.stories';

const { Default: Checkbox } = composeStories(stories);

describe('Checkbox', () => {
  it('should render with storybook', () => {
    render(<Checkbox />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should render with a label when children are provided', () => {
    render(<Checkbox>My checkbox</Checkbox>);

    expect(
      screen.getByRole('checkbox', {
        name: 'My checkbox',
      }),
    ).toBeInTheDocument();
  });
});
