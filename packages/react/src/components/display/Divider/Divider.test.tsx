import { getNameFromVanillaCSSVar, vars } from '@blockle/blocks-core';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils/testUtils.js';
import { Divider } from './Divider.js';
import * as styles from './divider.css.js';

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

  it('applies a Color role as the line color', () => {
    render(<Divider color="borderStrong" />);

    const divider = screen.getByRole('separator');
    expect(
      divider.style.getPropertyValue(
        getNameFromVanillaCSSVar(styles.dividerColorVar),
      ),
    ).toBe(vars.color.borderStrong);
  });

  it('uses currentColor when no color is given', () => {
    render(<Divider />);

    const divider = screen.getByRole('separator');
    expect(
      divider.style.getPropertyValue(
        getNameFromVanillaCSSVar(styles.dividerColorVar),
      ),
    ).toBe('currentColor');
  });

  it('only accepts Color roles for color', () => {
    // @ts-expect-error Palette shades are not Color roles
    render(<Divider color="primary-500" />);

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('should have horizontal orientation', () => {
    render(<Divider />);

    expect(screen.getByRole('separator')).toHaveAttribute(
      'aria-orientation',
      'horizontal',
    );
  });
});
