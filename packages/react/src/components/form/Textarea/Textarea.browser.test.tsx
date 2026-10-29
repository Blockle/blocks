import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils/browser/render.js';
import { Grid } from '../../layout/Grid/Grid.js';
import { GridItem } from '../../layout/Grid/GridItem.js';
import { Textarea } from './Textarea.js';

const lines = (count: number) =>
  Array.from({ length: count }, (_, i) => `Line ${i + 1}`).join('\n');

// Stays below the theme's 240px container cap
const longValue = lines(10);

const renderPair = async (fill: boolean, value = longValue) => {
  const screen = await render(
    <Grid gap={3} style={{ width: 600 }}>
      <GridItem colSpan={6}>
        <Textarea aria-label="First" grow fill={fill} />
      </GridItem>
      <GridItem colSpan={6}>
        <Textarea aria-label="Second" grow fill={fill} />
      </GridItem>
    </Grid>,
  );

  await screen.getByLabelText('First').fill(value);

  return {
    first: screen.getByLabelText('First').element() as HTMLTextAreaElement,
    second: screen.getByLabelText('Second').element() as HTMLTextAreaElement,
  };
};

describe('Textarea (browser)', () => {
  it('gives growing textareas side by side the same height with fill', async () => {
    const { first, second } = await renderPair(true);

    // Taller than the theme's 96px container minimum
    expect(first.offsetHeight).toBeGreaterThan(120);
    expect(second.offsetHeight).toBe(first.offsetHeight);
  });

  it('keeps the containers equal when a value grows past the container cap', async () => {
    const { first, second } = await renderPair(true, lines(30));

    expect(second.parentElement?.offsetHeight).toBe(
      first.parentElement?.offsetHeight,
    );
  });

  it('lets only the typed-in textarea grow without fill', async () => {
    const { first, second } = await renderPair(false);

    expect(second.offsetHeight).toBeLessThan(first.offsetHeight);
  });
});
