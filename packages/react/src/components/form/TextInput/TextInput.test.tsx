import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { TextInput } from './TextInput.js';

describe('TextInput', () => {
  it('should render with storybook', () => {
    render(
      <label htmlFor="input">
        <span>Label text</span>
        <TextInput id="input" name="text-input" />
      </label>,
    );

    expect(screen.getByLabelText('Label text')).toBeInTheDocument();
  });
});
