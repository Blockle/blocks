import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './VisuallyHidden.stories.js';

const { Default: VisuallyHidden } = composeStories(stories);

describe('VisuallyHidden', () => {
  it('should render with storybook', () => {
    render(<VisuallyHidden>This text is visually hidden</VisuallyHidden>);

    expect(
      screen.getByText('This text is visually hidden'),
    ).toBeInTheDocument();
  });
});
