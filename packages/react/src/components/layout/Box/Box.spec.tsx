import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Box } from './Box';

describe('Box', () => {
  it('should render', () => {
    render(<Box padding={['small', 'medium', 'large']}>Box content</Box>);

    expect(screen.getByText('Box content')).toBeInTheDocument();
  });

  it('should render Anchor when asChild prop is provided', () => {
    render(
      <Box asChild>
        <a href="/foo">Box content</a>
      </Box>,
    );

    const target = screen.getByText('Box content');

    expect(target.tagName).toEqual('A');
    expect(target).toHaveAttribute('href', '/foo');
  });
});
