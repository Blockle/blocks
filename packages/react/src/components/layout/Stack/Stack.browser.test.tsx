import { describe, expect, it } from 'vitest';

import { squareMarkers } from '../../../testUtils/browser/consumerStyles.css.js';
import { render } from '../../../testUtils/browser/render.js';
import { Stack } from './Stack.js';

const listStyleTypeOf = (element: Element) =>
  getComputedStyle(element).listStyleType;

describe('Stack list markers (browser)', () => {
  it.each([
    'ul',
    'ol',
  ] as const)('renders a %s child without markers with listStyle="none"', async (Tag) => {
    const screen = await render(
      <Stack asChild gap={2} listStyle="none" data-testid="list">
        <Tag>
          <li>Item</li>
        </Tag>
      </Stack>,
    );

    expect(listStyleTypeOf(screen.getByTestId('list').element())).toBe('none');
  });

  it('keeps the markers of a list child without listStyle', async () => {
    const screen = await render(
      <Stack asChild gap={2} data-testid="list">
        <ul>
          <li>Item</li>
        </ul>
      </Stack>,
    );

    expect(listStyleTypeOf(screen.getByTestId('list').element())).not.toBe(
      'none',
    );
  });

  it('lets a consumer className override listStyle="none"', async () => {
    const screen = await render(
      <Stack
        asChild
        gap={2}
        listStyle="none"
        className={squareMarkers}
        data-testid="list"
      >
        <ul>
          <li>Item</li>
        </ul>
      </Stack>,
    );

    expect(listStyleTypeOf(screen.getByTestId('list').element())).toBe(
      'square',
    );
  });
});
