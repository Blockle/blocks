import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './VisuallyHidden.stories';

const { Default: VisuallyHidden } = composeStories(stories);

describe('VisuallyHidden', () => {
  it('should render with storybook', () => {
    render(<VisuallyHidden>This text is visually hidden</VisuallyHidden>);

    expect(
      screen.getByText('This text is visually hidden'),
    ).toBeInTheDocument();
  });
});
