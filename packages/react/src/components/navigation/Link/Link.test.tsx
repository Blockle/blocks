import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { Link } from './Link.js';

describe('Link Component', () => {
  it('renders correctly with default props', () => {
    render(<Link href="/">Default Link</Link>);

    expect(
      screen.getByRole('link', { name: 'Default Link' }),
    ).toBeInTheDocument();
  });

  it('takes intent primary, neutral or inherit, and no variant', () => {
    render(
      <>
        <Link href="/" intent="primary">
          Primary
        </Link>
        <Link href="/" intent="neutral">
          Neutral
        </Link>
        <Link href="/" intent="inherit">
          Inherit
        </Link>
        {/* @ts-expect-error: secondary isn't a link intent */}
        <Link href="/" intent="secondary">
          Secondary
        </Link>
        {/* @ts-expect-error: danger isn't a link intent */}
        <Link href="/" intent="danger">
          Danger
        </Link>
        {/* @ts-expect-error: variant was renamed to intent */}
        <Link href="/" variant="primary">
          Variant
        </Link>
      </>,
    );
  });

  it('applies custom className', () => {
    render(
      <Link href="/" className="custom-class">
        Custom Link
      </Link>,
    );

    const link = screen.getByRole('link', { name: 'Custom Link' });

    expect(link).toHaveClass('custom-class');
  });

  it('renders as a child element when asChild is true', () => {
    render(
      <Link href="/" asChild>
        <span>Child Link</span>
      </Link>,
    );

    expect(screen.getByText('Child Link').tagName).toBe('SPAN');
  });

  it('forwards additional props to the anchor element', () => {
    render(
      <Link href="https://example.com" target="_blank" rel="noreferrer">
        External Link
      </Link>,
    );

    const link = screen.getByRole('link', { name: 'External Link' });

    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
});
