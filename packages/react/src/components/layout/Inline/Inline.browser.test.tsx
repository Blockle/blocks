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
  ] as const)('renders a %s child without markers with listStyle="none"', async (Tag) => {
    const screen = await render(
      <Inline asChild gap={2} listStyle="none" data-testid="list">
        <Tag>
          <li>Item</li>
        </Tag>
      </Inline>,
    );

    expect(listStyleTypeOf(screen.getByTestId('list').element())).toBe('none');
  });

  it('keeps the markers of a list child without listStyle', async () => {
    const screen = await render(
      <Inline asChild gap={2} data-testid="list">
        <ol>
          <li>Item</li>
        </ol>
      </Inline>,
    );

    expect(listStyleTypeOf(screen.getByTestId('list').element())).not.toBe(
      'none',
    );
  });

  it('lets a consumer className override listStyle="none"', async () => {
    const screen = await render(
      <Inline
        asChild
        gap={2}
        listStyle="none"
        className={squareMarkers}
        data-testid="list"
      >
        <ol>
          <li>Item</li>
        </ol>
      </Inline>,
    );

    expect(listStyleTypeOf(screen.getByTestId('list').element())).toBe(
      'square',
    );
  });
});
