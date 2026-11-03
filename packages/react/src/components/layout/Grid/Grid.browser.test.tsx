import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils/browser/render.js';
import { Grid } from './Grid.js';
import { GridItem } from './GridItem.js';

const tracksOf = (testId: string) => {
  const element = document.querySelector(`[data-testid="${testId}"]`);

  if (!element) {
    throw new Error(`No element with test id ${testId}`);
  }

  return getComputedStyle(element).gridTemplateColumns.split(' ');
};

describe('Grid layout', () => {
  it('should lay out 12 equal tracks by default', async () => {
    await render(
      <div style={{ inlineSize: 1000 }}>
        <Grid data-testid="grid">
          <GridItem colSpan={1}>Item</GridItem>
        </Grid>
      </div>,
    );

    const tracks = tracksOf('grid');

    expect(tracks).toHaveLength(12);
    expect(new Set(tracks).size).toBe(1);
  });

  it('should fill the row with as many tracks as fit with minColumnWidth', async () => {
    // Momotaro space step 6 is 40px, so 1000px fits 25 tracks
    await render(
      <div style={{ inlineSize: 1000 }}>
        <Grid minColumnWidth={6} data-testid="grid">
          <GridItem colSpan={1}>Item</GridItem>
        </Grid>
      </div>,
    );

    const tracks = tracksOf('grid');

    expect(tracks).toHaveLength(25);
    expect(tracks.every((track) => track === '40px')).toBe(true);
  });
});
