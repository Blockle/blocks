import { render } from '@testing-library/react';
import { Box } from './Box';

describe('Box', () => {
  it('should render', () => {
    const { getByText } = render(<Box padding={['small', 'medium', 'large']}>Box content</Box>);

    expect(getByText('Box content')).toBeInTheDocument();
  });

  it('should render Anchor', () => {
    const { getByText } = render(
      <Box as="a" href="/foo" padding={['small', 'medium', 'large']}>
        Box content
      </Box>,
    );

    expect(getByText('Box content')).toHaveAttribute('href', '/foo');
  });
});
