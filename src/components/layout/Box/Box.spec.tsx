import { render } from '@testing-library/react';
import { Box } from './Box';

describe('Box', () => {
  it('should render', () => {
    const { getByText } = render(<Box padding={['small', 'medium', 'large']}>Box content</Box>);

    expect(getByText('Box content')).toBeInTheDocument();
  });

  it('should render Anchor when asChild prop is provided', () => {
    const { getByText } = render(
      <Box asChild>
        <a href="/foo">Box content</a>
      </Box>,
    );

    const target = getByText('Box content');

    expect(target.tagName).toEqual('A');
    expect(target).toHaveAttribute('href', '/foo');
  });
});
