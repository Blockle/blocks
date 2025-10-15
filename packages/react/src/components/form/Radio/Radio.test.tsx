import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import * as stories from './Radio.stories.js';

const { Default: Radio } = composeStories(stories);

describe('Label', () => {
  it('should render', () => {
    render(<Radio />);

    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('should render with label when children are passed in', () => {
    render(<Radio>My label text</Radio>);

    expect(screen.getByLabelText('My label text')).toBeInTheDocument();
  });
});
