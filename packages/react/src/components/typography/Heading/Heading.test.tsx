import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Heading } from './Heading';

describe('Heading', () => {
  it('renders the correct heading level', () => {
    const { container } = render(<Heading level={2}>Test Heading</Heading>);
    const heading = container.querySelector('h2');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Heading');
  });

  it('applies the correct className', () => {
    const { container } = render(
      <Heading level={1} className="custom-class">
        Test Heading
      </Heading>,
    );
    const heading = container.querySelector('h1');
    expect(heading).toHaveClass('custom-class');
  });

  it('renders children correctly', () => {
    const { getByText } = render(<Heading level={3}>Child Content</Heading>);
    expect(getByText('Child Content')).toBeInTheDocument();
  });

  it('passes additional props to the underlying element', () => {
    const { container } = render(
      <Heading level={4} id="heading-id" data-test="test-prop">
        Test Heading
      </Heading>,
    );
    const heading = container.querySelector('h4');
    expect(heading).toHaveAttribute('id', 'heading-id');
    expect(heading).toHaveAttribute('data-test', 'test-prop');
  });
});
