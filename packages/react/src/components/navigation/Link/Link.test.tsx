import type { Theme } from '@blockle/blocks-core';
import { describe, expect, it } from 'vitest';

import { testingTheme } from '../../../testUtils/testTheme.css.js';
import { render, screen } from '../../../testUtils/testUtils.js';
import { BlocksProvider } from '../../providers/BlocksProvider/BlocksProvider.js';
import { Link } from './Link.js';

const intentTheme: Theme = {
  ...testingTheme,
  components: {
    ...testingTheme.components,
    link: {
      root: 'link-root',
      variants: {
        intent: {
          inherit: 'link-intent-inherit',
          primary: 'link-intent-primary',
          secondary: 'link-intent-secondary',
        },
      },
      defaultVariants: { intent: 'primary' },
    },
  },
};

const withIntentTheme = ({ children }: { children: React.ReactNode }) => (
  <BlocksProvider theme={intentTheme}>{children}</BlocksProvider>
);

describe('Link Component', () => {
  it('renders correctly with default props', () => {
    render(<Link href="/">Default Link</Link>);

    expect(
      screen.getByRole('link', { name: 'Default Link' }),
    ).toBeInTheDocument();
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

  it('applies the intent style', () => {
    render(
      <Link href="/" intent="secondary">
        Secondary Link
      </Link>,
      { wrapper: withIntentTheme },
    );

    const link = screen.getByRole('link', { name: 'Secondary Link' });

    expect(link).toHaveClass('link-intent-secondary');
    expect(link).not.toHaveClass('link-intent-primary');
  });

  it('applies the default intent style', () => {
    render(<Link href="/">Primary Link</Link>, { wrapper: withIntentTheme });

    expect(screen.getByRole('link', { name: 'Primary Link' })).toHaveClass(
      'link-intent-primary',
    );
  });

  it('no longer accepts the variant prop', () => {
    render(
      // @ts-expect-error variant was renamed to intent
      <Link href="/" variant="secondary">
        Old Link
      </Link>,
    );

    expect(screen.getByRole('link', { name: 'Old Link' })).toBeInTheDocument();
  });
});
