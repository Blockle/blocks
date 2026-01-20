import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Slot } from './Slot.js';

describe('Slot', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Slot>
        <div>Test content</div>
      </Slot>,
    );

    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    const { getByText } = render(
      <Slot>
        <div>First</div>
        <div>Second</div>
      </Slot>,
    );

    expect(getByText('First')).toBeInTheDocument();
    expect(getByText('Second')).toBeInTheDocument();
  });

  it('renders nothing when children is undefined', () => {
    const { container } = render(<Slot />);

    expect(container.firstChild).toBeNull();
  });

  it('renders text content', () => {
    const { getByText } = render(<Slot>Plain text</Slot>);

    expect(getByText('Plain text')).toBeInTheDocument();
  });
});
