import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils/testUtils.js';
import { IconMask } from './IconMask.js';

describe('IconMask', () => {
  it('renders with required props', () => {
    const { container } = render(<IconMask src="icon.svg" />);
    const span = container.querySelector('span');

    expect(span).toBeInTheDocument();
    expect(span).toHaveAttribute('role', 'presentation');
  });

  it('applies mask style with src', () => {
    const { container } = render(<IconMask src="test-icon.svg" />);
    const span = container.querySelector('span');

    expect(span).toHaveStyle({ maskImage: 'url(test-icon.svg)' });
  });

  it('applies custom className', () => {
    const { container } = render(
      <IconMask src="icon.svg" className="custom-class" />,
    );
    const span = container.querySelector('span');

    expect(span).toHaveClass('custom-class');
  });

  it('applies color prop', () => {
    const { container } = render(
      <IconMask src="icon.svg" color="danger-500" />,
    );
    const span = container.querySelector('span');

    expect(span?.className).toBeTruthy();
  });

  it('applies size variant', () => {
    const { container } = render(<IconMask src="icon.svg" size="small" />);
    const span = container.querySelector('span');

    expect(span?.className).toBeTruthy();
  });

  it('merges custom style with mask style', () => {
    const { container } = render(
      <IconMask src="icon.svg" style={{ opacity: 0.5 }} />,
    );
    const span = container.querySelector('span');

    expect(span).toHaveStyle({
      maskImage: 'url(icon.svg)',
      opacity: 0.5,
    });
  });

  it('passes through margin atoms', () => {
    const { container } = render(<IconMask src="icon.svg" margin={1} />);
    const span = container.querySelector('span');

    expect(span?.className).toBeTruthy();
  });

  it('passes through other props', () => {
    const { container } = render(
      <IconMask src="icon.svg" data-testid="icon-mask" />,
    );
    const span = container.querySelector('span');

    expect(span).toHaveAttribute('data-testid', 'icon-mask');
  });
});
