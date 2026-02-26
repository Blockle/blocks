import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import * as styles from './Textarea.css.js';
import { Textarea } from './Textarea.js';

describe('Textarea', () => {
  it('should render with storybook', () => {
    render(
      <label htmlFor="textarea">
        <span>Textarea label</span>
        <Textarea id="textarea" />
      </label>,
    );

    expect(screen.getByLabelText('Textarea label')).toBeInTheDocument();
  });

  it('should render with provided value', () => {
    render(<Textarea value="Test content" onChange={vi.fn()} />);

    expect(screen.getByRole('textbox')).toHaveValue('Test content');
  });

  it('should apply grow class when grow prop is true', () => {
    render(<Textarea grow />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass(styles.fieldSizingEnabled);
  });

  it('should not apply grow class when grow prop is false', () => {
    render(<Textarea grow={false} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).not.toHaveClass(styles.fieldSizingEnabled);
  });

  it('should forward additional props to textarea element', () => {
    render(<Textarea placeholder="Enter text" disabled />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', 'Enter text');
    expect(textarea).toBeDisabled();
  });
});
