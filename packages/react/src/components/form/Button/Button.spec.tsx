import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './Button.stories';

const { Default: Button } = composeStories(stories);

describe('Button', () => {
  it('should render with storybook', () => {
    render(<Button />);

    expect(screen.getByText('Button')).toBeInTheDocument();
  });
});
