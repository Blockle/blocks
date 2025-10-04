import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './Spinner.stories.js';

const { Default: Spinner } = composeStories(stories);

describe('Spinner', () => {
  it('should render', () => {
    render(<Spinner />);

    expect(screen.getByTestId('blocks-spinner')).toBeInTheDocument();
  });
});
