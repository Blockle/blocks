import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './Button.stories.js';

const { Default: Button } = composeStories(stories);

describe('Button', () => {
  it('should render', () => {
    render(<Button />);

    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('should render with spinner when set to loading', () => {
    render(<Button loading />);

    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByTestId('blocks-spinner')).toBeInTheDocument();
  });

  it('should render startSlot content', () => {
    render(<Button startSlot={<span>Start slot content</span>} />);

    expect(screen.getByText('Start slot content')).toBeInTheDocument();
  });

  it('should render endSlot content', () => {
    render(<Button endSlot={<span>End slot content</span>} />);

    expect(screen.getByText('End slot content')).toBeInTheDocument();
  });
});
