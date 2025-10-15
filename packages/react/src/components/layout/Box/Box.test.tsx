import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { Box } from './Box.js';

describe('Box', () => {
  it('should render', () => {
    render(<Box padding={[1, 3, 5]}>Box content</Box>);

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
