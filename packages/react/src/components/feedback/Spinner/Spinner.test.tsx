import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import * as stories from './Spinner.stories.js';

const { Default: Spinner } = composeStories(stories);

describe('Spinner', () => {
  it('should render', () => {
    render(<Spinner />);

    expect(screen.getByTestId('blocks-spinner')).toBeInTheDocument();
  });
});
