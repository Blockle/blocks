import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './Radio.stories';

const { Default: Radio } = composeStories(stories);

describe('Label', () => {
  it('should render with storybook', () => {
    render(<Radio>My label text</Radio>);

    expect(screen.getByRole('radio')).toBeInTheDocument();
  });
});
