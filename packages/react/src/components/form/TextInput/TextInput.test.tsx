import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import * as stories from './TextInput.stories.js';

const { Default: TextInput } = composeStories(stories);

describe('TextInput', () => {
  it('should render with storybook', () => {
    render(
      <label htmlFor="input">
        <span>Label text</span>
        <TextInput id="input" />
      </label>,
    );

    expect(screen.getByLabelText('Label text')).toBeInTheDocument();
  });
});
