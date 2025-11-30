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
});
