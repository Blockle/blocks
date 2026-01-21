import { vars } from '@blockle/blocks-core';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils/testUtils.js';
import { Divider } from './Divider.js';

describe('Divider', () => {
  it('should render with storybook', async () => {
    render(<Divider />);

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('should render with correct alignment', () => {
    render(<Divider alignment="start" />);

    expect(screen.getByRole('separator')).toHaveAttribute(
      'data-alignment',
      'start',
    );
  });

  it('should render with default alignment center', () => {
    render(<Divider />);

    expect(screen.getByRole('separator')).toHaveAttribute(
      'data-alignment',
      'center',
    );
  });

  it('should render children', () => {
    render(<Divider>Content</Divider>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<Divider className="custom-class" />);

    expect(screen.getByRole('separator')).toHaveClass('custom-class');
  });

  it('should apply color style', () => {
    render(<Divider color="primary-500" />);

    const divider = screen.getByRole('separator');
    expect(getComputedStyle(divider).getPropertyValue('--test-var')).toEqual(
      vars.color['primary-500'],
    );
  });

  it('should have horizontal orientation', () => {
    render(<Divider />);

    expect(screen.getByRole('separator')).toHaveAttribute(
      'aria-orientation',
      'horizontal',
    );
  });
});
