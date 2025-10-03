import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './Input.stories.js';

const { Default: Input } = composeStories(stories);

describe('Input', () => {
  it('should render with storybook', () => {
    render(
      <label htmlFor="input">
        <span>Label text</span>
        <Input id="input" />
      </label>,
    );

    expect(screen.getByLabelText('Label text')).toBeInTheDocument();
  });
});
