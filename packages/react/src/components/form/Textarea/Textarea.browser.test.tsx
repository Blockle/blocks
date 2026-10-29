import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils/browser/render.js';
import { Grid } from '../../layout/Grid/Grid.js';
import { GridItem } from '../../layout/Grid/GridItem.js';
import { Textarea, type TextareaProps } from './Textarea.js';

const lines = (count: number) =>
  Array.from({ length: count }, (_, i) => `Line ${i + 1}`).join('\n');

// Stays below the theme's 240px container cap
const longValue = lines(10);

// Grows past the theme's 240px container cap
const veryLongValue = lines(30);

type PairOptions = Pick<TextareaProps, 'fill' | 'maxBlockSize'> & {
  value?: string;
};

const renderPair = async ({ value = longValue, ...props }: PairOptions) => {
  const screen = await render(
    <Grid gap={3} style={{ width: 600 }}>
      <GridItem colSpan={6}>
        <Textarea aria-label="First" grow {...props} />
      </GridItem>
      <GridItem colSpan={6}>
        <Textarea aria-label="Second" grow {...props} />
      </GridItem>
    </Grid>,
  );

  await screen.getByLabelText('First').fill(value);

  const first = screen.getByLabelText('First').element();
  const second = screen.getByLabelText('Second').element();

  if (
    !(first instanceof HTMLTextAreaElement) ||
    !(second instanceof HTMLTextAreaElement)
  ) {
    throw new Error('Expected two textarea elements');
  }

  return { first, second };
};

const containerOf = (textarea: HTMLTextAreaElement) => {
  const container = textarea.parentElement;

  if (!container) {
    throw new Error('Expected the textarea to have a container');
  }

  return container;
};

describe('Textarea (browser)', () => {
  it('gives growing textareas side by side the same height with fill', async () => {
    const { first, second } = await renderPair({ fill: true });

    // Taller than the theme's 96px container minimum
    expect(first.offsetHeight).toBeGreaterThan(120);
    expect(second.offsetHeight).toBe(first.offsetHeight);
  });

  it('matches only the containers once a value grows past the container cap', async () => {
    const { first, second } = await renderPair({
      fill: true,
      value: veryLongValue,
    });

    expect(containerOf(second).offsetHeight).toBe(
      containerOf(first).offsetHeight,
    );
    // The typed-in textarea keeps growing and scrolls inside its container
    expect(second.offsetHeight).toBeLessThan(first.offsetHeight);
  });

  it('gives long values the same height when maxBlockSize lifts the cap', async () => {
    const { first, second } = await renderPair({
      fill: true,
      maxBlockSize: 'none',
      value: veryLongValue,
    });

    expect(first.offsetHeight).toBeGreaterThan(240);
    expect(second.offsetHeight).toBe(first.offsetHeight);
  });

  it('lets only the typed-in textarea grow without fill', async () => {
    const { first, second } = await renderPair({ fill: false });

    expect(second.offsetHeight).toBeLessThan(first.offsetHeight);
  });
});
