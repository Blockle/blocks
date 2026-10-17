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

  it('should merge the provided className with textarea styles', () => {
    render(<Textarea className="custom-textarea" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass(styles.textarea);
    expect(textarea).toHaveClass('custom-textarea');
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

  it('should apply maxHeight to the container when growing', () => {
    render(<Textarea grow maxHeight={240} />);

    expect(screen.getByRole('textbox').parentElement).toHaveStyle({
      maxHeight: '240px',
    });
  });

  it('should not apply maxHeight to the container when not growing', () => {
    render(<Textarea maxHeight={240} />);

    expect(screen.getByRole('textbox').parentElement).not.toHaveStyle({
      maxHeight: '240px',
    });
  });

  it('should forward and merge container props', () => {
    render(
      <Textarea
        containerProps={{
          id: 'textarea-container',
          className: 'custom-container',
          style: { maxHeight: 320, minHeight: 120 },
        }}
        grow
        maxHeight={240}
      />,
    );

    const container = screen.getByRole('textbox').parentElement;
    expect(container).toHaveAttribute('id', 'textarea-container');
    expect(container).toHaveClass('custom-container');
    expect(container).toHaveStyle({
      maxHeight: '320px',
      minHeight: '120px',
    });
  });

  it('should forward additional props to textarea element', () => {
    render(<Textarea placeholder="Enter text" disabled />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', 'Enter text');
    expect(textarea).toBeDisabled();
  });
});
