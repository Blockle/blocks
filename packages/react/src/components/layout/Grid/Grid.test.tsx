import { atoms } from '@blockle/blocks-core';
import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import * as styles from './Grid.css.js';
import { Grid } from './Grid.js';
import { GridItem } from './GridItem.js';

describe('Grid', () => {
  it('should render', () => {
    render(
      <Grid>
        <GridItem colSpan={12}>Grid content</GridItem>
      </Grid>,
    );

    const gridItem = screen.getByText('Grid content');

    expect(gridItem).toBeInTheDocument();
    expect(gridItem).toHaveClass(styles.responsiveColSpanStyles[12][0]);
  });

  it('should apply responsive colSpan styles', () => {
    render(
      <Grid rowGap={2} columnGap={3}>
        <GridItem colSpan={[2, 4, 6]}>Grid item 1</GridItem>
      </Grid>,
    );

    const gridItem1 = screen.getByText('Grid item 1');

    expect(gridItem1).toBeInTheDocument();
    expect(gridItem1).toHaveClass(
      styles.responsiveColSpanStyles[2][0],
      styles.responsiveColSpanStyles[4][1],
      styles.responsiveColSpanStyles[6][2],
    );
  });

  it('should apply responsive rowSpan styles', () => {
    render(
      <Grid rowGap={2} columnGap={3}>
        <GridItem rowSpan={[1, 2, 3]} colSpan={4}>
          Grid item with rowSpan
        </GridItem>
      </Grid>,
    );

    const gridItem = screen.getByText('Grid item with rowSpan');

    expect(gridItem).toBeInTheDocument();
    expect(gridItem).toHaveClass(
      styles.responsiveRowSpanStyles[1][0],
      styles.responsiveRowSpanStyles[2][1],
      styles.responsiveRowSpanStyles[3][2],
    );
  });

  it('should apply the grid class and keep a custom className', () => {
    render(
      <Grid className="custom" data-testid="grid">
        <GridItem colSpan={12}>Item</GridItem>
      </Grid>,
    );

    expect(screen.getByTestId('grid')).toHaveClass(styles.grid, 'custom');
  });

  it('should apply layout atoms to the grid element', () => {
    render(
      <Grid gap={3} alignItems="center" paddingBlock={2} data-testid="grid">
        <GridItem colSpan={12}>Item</GridItem>
      </Grid>,
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass(
      atoms({ display: 'grid', gap: 3, alignItems: 'center', paddingBlock: 2 }),
    );
  });

  it('should allow overriding display', () => {
    render(
      <Grid display="inline-grid" data-testid="grid">
        <GridItem colSpan={12}>Item</GridItem>
      </Grid>,
    );

    expect(screen.getByTestId('grid')).toHaveClass(
      atoms({ display: 'inline-grid' }),
    );
  });

  it('should keep the 12-column template without minColumnWidth', () => {
    render(
      <Grid data-testid="grid">
        <GridItem colSpan={1}>Item</GridItem>
      </Grid>,
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass(styles.grid);

    for (const autoFillClass of Object.values(styles.minColumnWidth)) {
      expect(grid).not.toHaveClass(autoFillClass);
    }
  });

  describe('minColumnWidth', () => {
    it('should lay out auto-fill columns instead of the 12-column template', () => {
      render(
        <Grid minColumnWidth={6} data-testid="grid">
          <GridItem colSpan={1}>Item</GridItem>
        </Grid>,
      );

      const grid = screen.getByTestId('grid');
      expect(grid).toHaveClass(styles.minColumnWidth[6]);
      expect(grid).not.toHaveClass(styles.grid);
    });

    it('should keep a custom className and atoms', () => {
      render(
        <Grid minColumnWidth={3} gap={2} className="custom" data-testid="grid">
          <GridItem colSpan={1}>Item</GridItem>
        </Grid>,
      );

      expect(screen.getByTestId('grid')).toHaveClass(
        styles.minColumnWidth[3],
        'custom',
        atoms({ display: 'grid', gap: 2 }),
      );
    });

    it('should not forward minColumnWidth to the DOM', () => {
      render(
        <Grid minColumnWidth={4} data-testid="grid">
          <GridItem colSpan={1}>Item</GridItem>
        </Grid>,
      );

      const grid = screen.getByTestId('grid');
      expect(grid).not.toHaveAttribute('mincolumnwidth');
      expect(grid).not.toHaveAttribute('minColumnWidth');
    });

    it('should reject 0 and responsive values', () => {
      // @ts-expect-error 0 is not a column width
      render(<Grid minColumnWidth={0} />);
      // @ts-expect-error responsive values are not supported
      render(<Grid minColumnWidth={[4, 6]} />);
    });
  });
});
