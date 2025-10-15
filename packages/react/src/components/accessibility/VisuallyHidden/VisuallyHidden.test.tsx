import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
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
