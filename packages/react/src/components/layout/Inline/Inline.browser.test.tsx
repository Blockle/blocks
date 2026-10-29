import { describe, expect, it } from 'vitest';

import { squareMarkers } from '../../../testUtils/browser/consumerStyles.css.js';
import { render } from '../../../testUtils/browser/render.js';
import { Inline } from './Inline.js';

const listStyleTypeOf = (element: Element) =>
  getComputedStyle(element).listStyleType;

describe('Inline list markers (browser)', () => {
  it.each([
    'ul',
    'ol',
  ] as const)('renders tag="%s" without markers', async (tag) => {
    const screen = await render(
      <Inline tag={tag} gap={2} data-testid="list">
        <li>Item</li>
      </Inline>,
    );

    expect(listStyleTypeOf(screen.getByTestId('list').element())).toBe('none');
  });

  it('lets a consumer className override the default', async () => {
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
