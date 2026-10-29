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

  it('should pass name through to the input', () => {
    render(<TextInput name="text-input" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'text-input');
  });

  it('should render without a name', () => {
    render(<TextInput />);

    expect(screen.getByRole('textbox')).not.toHaveAttribute('name');
  });
});
