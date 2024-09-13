import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './Input.stories';

const { Default: Input } = composeStories(stories);

describe('Input', () => {
  it('should render with storybook', () => {
    render(
      <label>
        <span>Label text</span>
        <Input />
      </label>,
    );

    expect(screen.getByLabelText('Label text')).toBeInTheDocument();
  });
});
