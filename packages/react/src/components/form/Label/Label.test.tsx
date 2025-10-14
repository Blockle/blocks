import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './Label.stories.js';

const { Default: Label } = composeStories(stories);

describe('Label', () => {
  it('should render with storybook', () => {
    render(<Label>My label text</Label>);

    expect(screen.getByText('My label text')).toBeInTheDocument();
  });

  it('should be usable as a label', () => {
    render(
      <>
        <Label htmlFor="input">My label text</Label>
        <input id="input" />
      </>,
    );

    expect(screen.getByLabelText('My label text')).toBeInTheDocument();
  });
});
