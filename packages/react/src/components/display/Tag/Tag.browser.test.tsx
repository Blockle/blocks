import { vars } from '@blockle/blocks-core';
import { describe, expect, it } from 'vitest';

import { resolve } from '../../../testUtils/browser/contrast.js';
import { render } from '../../../testUtils/browser/render.js';
import { IconButton } from '../../form/IconButton/IconButton.js';
import { IconMask } from '../Icon/IconMask.js';
import { Tag } from './Tag.js';

const sizes = ['small', 'medium', 'large'] as const;

const intents = [
  'primary',
  'secondary',
  'neutral',
  'danger',
  'success',
  'info',
  'warning',
] as const;

// A 1×1 transparent GIF, so the img has an intrinsic size of its own
const pixel =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const CloseIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

function height(element: Element) {
  return element.getBoundingClientRect().height;
}

describe('Tag (browser)', () => {
  it('defaults to the neutral intent and the small size', async () => {
    const screen = await render(
      <>
        <Tag data-testid="default">bug</Tag>
        <Tag data-testid="explicit" intent="neutral" size="small">
          bug
        </Tag>
      </>,
      { colorMode: 'light' },
    );
    const plain = getComputedStyle(screen.getByTestId('default').element());
    const explicit = getComputedStyle(screen.getByTestId('explicit').element());

    expect(plain.backgroundColor).toBe(explicit.backgroundColor);
    expect(plain.fontSize).toBe(explicit.fontSize);
    expect(plain.paddingInlineStart).toBe(explicit.paddingInlineStart);
  });

  for (const intent of intents) {
    it(`renders the ${intent} intent with its subtle and foreground roles`, async () => {
      const roles = vars.colorRole[intent];
      const screen = await render(
        <Tag data-testid="tag" intent={intent}>
          bug
        </Tag>,
        { colorMode: 'light' },
      );
      const { backgroundColor, color } = getComputedStyle(
        screen.getByTestId('tag').element(),
      );

      expect({ backgroundColor, color }).toEqual({
        backgroundColor: await resolve(roles.subtle, 'light'),
        color: await resolve(roles.foreground, 'light'),
      });
    });
  }

  it('grows with each size', async () => {
    const screen = await render(
      <div>
        <Tag data-testid="small" size="small">
          bug
        </Tag>
        <Tag data-testid="medium" size="medium">
          bug
        </Tag>
        <Tag data-testid="large" size="large">
          bug
        </Tag>
      </div>,
    );
    const small = height(screen.getByTestId('small').element());
    const medium = height(screen.getByTestId('medium').element());
    const large = height(screen.getByTestId('large').element());

    expect(small).toBeLessThan(medium);
    expect(medium).toBeLessThan(large);
  });

  it('keeps its text on one line', async () => {
    const screen = await render(
      <div style={{ inlineSize: 40 }}>
        <Tag data-testid="tag">a long label name</Tag>
      </div>,
    );
    const tag = screen.getByTestId('tag').element();

    expect(getComputedStyle(tag).whiteSpace).toBe('nowrap');
  });

  for (const size of sizes) {
    it(`keeps its ${size} height with a ghost IconButton in endSlot`, async () => {
      const screen = await render(
        <>
          <Tag data-testid="plain" size={size}>
            bug
          </Tag>
          <Tag
            data-testid="removable"
            size={size}
            endSlot={
              <IconButton
                label="Remove label bug"
                variant="ghost"
                size="small"
                shape="circle"
                intent="inherit"
              >
                <CloseIcon />
              </IconButton>
            }
          >
            bug
          </Tag>
        </>,
      );

      expect(height(screen.getByTestId('removable').element())).toBe(
        height(screen.getByTestId('plain').element()),
      );
    });

    it(`keeps its ${size} height with an Icon, an img or an emoji in startSlot`, async () => {
      const screen = await render(
        <>
          <Tag data-testid="plain" size={size}>
            bug
          </Tag>
          <Tag
            data-testid="icon"
            size={size}
            startSlot={<IconMask src="/icon.svg" size="xlarge" />}
          >
            bug
          </Tag>
          <Tag
            data-testid="img"
            size={size}
            startSlot={<img src={pixel} alt="" width={64} height={64} />}
          >
            bug
          </Tag>
          <Tag data-testid="emoji" size={size} startSlot="🐛">
            bug
          </Tag>
        </>,
      );
      const plain = height(screen.getByTestId('plain').element());

      expect(height(screen.getByTestId('icon').element())).toBe(plain);
      expect(height(screen.getByTestId('img').element())).toBe(plain);
      expect(height(screen.getByTestId('emoji').element())).toBe(plain);
    });
  }

  it('sizes Slot content to the line height', async () => {
    const screen = await render(
      <>
        <Tag
          startSlot={<img src={pixel} alt="avatar" width={64} height={64} />}
          endSlot={
            <IconButton label="Remove label bug" variant="ghost" size="small">
              <CloseIcon />
            </IconButton>
          }
        >
          bug
        </Tag>
        <Tag
          startSlot={
            <IconMask data-testid="icon" src="/icon.svg" size="xlarge" />
          }
        >
          Blocked
        </Tag>
      </>,
    );
    const img = screen.getByRole('img', { name: 'avatar' }).element();
    const button = screen
      .getByRole('button', { name: 'Remove label bug' })
      .element();
    const icon = screen.getByTestId('icon').element();
    const lineHeight = Number.parseFloat(
      getComputedStyle(img.parentElement as Element).blockSize,
    );

    expect(height(img)).toBe(lineHeight);
    expect(img.getBoundingClientRect().width).toBe(lineHeight);
    expect(height(button)).toBe(lineHeight);
    expect(icon.getBoundingClientRect().width).toBe(lineHeight);
  });

  it('reduces the padding on the side with a filled startSlot', async () => {
    const screen = await render(
      <Tag data-testid="tag" startSlot="🐛">
        bug
      </Tag>,
    );
    const { paddingInlineStart, paddingInlineEnd } = getComputedStyle(
      screen.getByTestId('tag').element(),
    );

    expect(Number.parseFloat(paddingInlineStart)).toBeLessThan(
      Number.parseFloat(paddingInlineEnd),
    );
  });

  it('reduces the padding on the side with a filled endSlot', async () => {
    const screen = await render(
      <Tag data-testid="tag" endSlot="🐛">
        bug
      </Tag>,
    );
    const { paddingInlineStart, paddingInlineEnd } = getComputedStyle(
      screen.getByTestId('tag').element(),
    );

    expect(Number.parseFloat(paddingInlineEnd)).toBeLessThan(
      Number.parseFloat(paddingInlineStart),
    );
  });
});
