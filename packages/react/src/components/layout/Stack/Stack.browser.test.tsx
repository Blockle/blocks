import { describe, expect, it } from 'vitest';

import { squareMarkers } from '../../../testUtils/browser/consumerStyles.css.js';
import { render } from '../../../testUtils/browser/render.js';
import { Inline } from '../Inline/Inline.js';
import { Stack } from './Stack.js';

const listStyleTypeOf = (element: Element) =>
  getComputedStyle(element).listStyleType;

describe('list markers on Stack and Inline (browser)', () => {
  it.each([
    'ul',
    'ol',
  ] as const)('renders Stack tag="%s" without markers', async (tag) => {
    const screen = await render(
      <Stack tag={tag} gap={2} data-testid="list">
        <li>Item</li>
      </Stack>,
    );

    expect(listStyleTypeOf(screen.getByTestId('list').element())).toBe('none');
  });

  it.each([
    'ul',
    'ol',
  ] as const)('renders Inline tag="%s" without markers', async (tag) => {
    const screen = await render(
      <Inline tag={tag} gap={2} data-testid="list">
        <li>Item</li>
      </Inline>,
    );

    expect(listStyleTypeOf(screen.getByTestId('list').element())).toBe('none');
  });

  it('lets a consumer className override the default on Stack', async () => {
    const screen = await render(
      <Stack tag="ul" gap={2} className={squareMarkers} data-testid="list">
        <li>Item</li>
      </Stack>,
    );

    expect(listStyleTypeOf(screen.getByTestId('list').element())).toBe(
      'square',
    );
  });

  it('lets a consumer className override the default on Inline', async () => {
    const screen = await render(
      <Inline tag="ol" gap={2} className={squareMarkers} data-testid="list">
        <li>Item</li>
      </Inline>,
    );

    expect(listStyleTypeOf(screen.getByTestId('list').element())).toBe(
      'square',
    );
  });
});
