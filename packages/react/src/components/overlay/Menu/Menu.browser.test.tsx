import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';

import { render } from '../../../testUtils/browser/render.js';
import { Menu, type MenuItem } from './Menu.js';

const items: MenuItem[] = [
  { label: 'Archive', onSelect: vi.fn() },
  { label: 'Rename', onSelect: vi.fn(), disabled: true },
  { type: 'separator' },
  { label: 'Delete', onSelect: vi.fn() },
];

async function renderMenu(menuItems: MenuItem[] = items) {
  const screen = await render(
    <div style={{ position: 'fixed', top: 100, left: 100 }}>
      <Menu items={menuItems}>
        <button type="button">More</button>
      </Menu>
    </div>,
  );

  return {
    screen,
    trigger: screen.getByRole('button', { name: 'More' }),
    item: (name: string) => screen.getByRole('menuitem', { name, exact: true }),
  };
}

const expectClosed = () =>
  vi.waitFor(() => expect(document.querySelector('[role="menu"]')).toBeNull());

const focused = () => document.activeElement?.textContent;

// Popover attaches its click outside listener on the next frame; wait for it,
// and for the opening animation, before clicking outside or on the trigger
const settleOpen = async () => {
  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);
  await Promise.all(document.getAnimations().map(({ finished }) => finished));
};

describe('Menu (browser)', () => {
  it('opens below the trigger on the first item with a click', async () => {
    const { trigger, item } = await renderMenu();

    await trigger.click();
    await expect.element(item('Archive')).toHaveFocus();

    const menu = document.querySelector('[role="menu"]') as HTMLElement;

    // Wait for the opening transition, which scales the list
    await Promise.all(menu.getAnimations().map((a) => a.finished));

    const list = menu.getBoundingClientRect();
    const anchor = trigger.element().getBoundingClientRect();

    expect(list.top).toBeGreaterThanOrEqual(anchor.bottom);
    expect(list.left).toBeCloseTo(anchor.left, 0);
  });

  it('opens with the keyboard', async () => {
    const { trigger, item } = await renderMenu();

    (trigger.element() as HTMLElement).focus();
    await userEvent.keyboard('{ArrowUp}');

    await expect.element(item('Delete')).toHaveFocus();
  });

  it('navigates with wrapping, skipping disabled items', async () => {
    const { trigger, item } = await renderMenu();

    await trigger.click();
    await expect.element(item('Archive')).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');
    expect(focused()).toBe('Delete');

    await userEvent.keyboard('{ArrowDown}');
    expect(focused()).toBe('Archive');

    await userEvent.keyboard('{End}');
    expect(focused()).toBe('Delete');

    await userEvent.keyboard('{Home}');
    expect(focused()).toBe('Archive');
  });

  it('moves focus by typing, skipping disabled items', async () => {
    const { trigger, item } = await renderMenu();

    await trigger.click();
    await expect.element(item('Archive')).toHaveFocus();

    await userEvent.keyboard('d');
    expect(focused()).toBe('Delete');

    await userEvent.keyboard('r');
    expect(focused()).toBe('Delete');
  });

  it('focuses an item on hover', async () => {
    const { trigger, item } = await renderMenu();

    await trigger.click();
    await item('Delete').hover();

    await expect.element(item('Delete')).toHaveFocus();
  });

  it('picks an action with a click and returns focus to the trigger', async () => {
    const onSelect = vi.fn();
    const { trigger, item } = await renderMenu([{ label: 'Go', onSelect }]);

    await trigger.click();
    await item('Go').click();

    expect(onSelect).toHaveBeenCalledTimes(1);
    await expect.element(trigger).toHaveFocus();
    await expectClosed();
  });

  it('closes with Escape and returns focus to the trigger', async () => {
    const { trigger, item } = await renderMenu();

    await trigger.click();
    await expect.element(item('Archive')).toHaveFocus();
    await userEvent.keyboard('{Escape}');

    await expect.element(trigger).toHaveFocus();
    await expectClosed();
  });

  it('closes with Tab', async () => {
    const { trigger, item } = await renderMenu();

    await trigger.click();
    await expect.element(item('Archive')).toHaveFocus();
    await userEvent.tab();

    await expectClosed();
  });

  it('closes on an outside click', async () => {
    const { trigger, item } = await renderMenu();

    await trigger.click();
    await expect.element(item('Archive')).toHaveFocus();
    await settleOpen();
    // A point clear of the trigger and the list
    await userEvent.click(document.body, { position: { x: 5, y: 5 } });

    await expectClosed();
  });

  it('closes when the trigger is clicked again', async () => {
    const { trigger, item } = await renderMenu();

    await trigger.click();
    await expect.element(item('Archive')).toHaveFocus();
    await settleOpen();
    await trigger.click();

    await expectClosed();
  });

  it('scrolls a long list within the viewport and keeps the focused item in view', async () => {
    const many: MenuItem[] = Array.from({ length: 80 }, (_, index) => ({
      label: `Item ${index + 1}`,
      onSelect: vi.fn(),
    }));
    const { trigger, item } = await renderMenu(many);

    await trigger.click();
    await expect.element(item('Item 1')).toHaveFocus();

    const list = document.querySelector('[role="menu"]') as HTMLElement;

    // Stops at the bottom of the viewport, not just shorter than it
    expect(list.getBoundingClientRect().bottom).toBeLessThanOrEqual(
      document.documentElement.clientHeight,
    );
    expect(list.scrollHeight).toBeGreaterThan(list.clientHeight);

    await userEvent.keyboard('{End}');

    const focusedRect = document.activeElement?.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();

    expect(focused()).toBe('Item 80');
    expect(focusedRect?.bottom).toBeLessThanOrEqual(listRect.bottom + 1);
    expect(focusedRect?.top).toBeGreaterThanOrEqual(listRect.top - 1);
  });

  it('flips a long list above a trigger near the bottom and stops at the top', async () => {
    const many: MenuItem[] = Array.from({ length: 80 }, (_, index) => ({
      label: `Item ${index + 1}`,
      onSelect: vi.fn(),
    }));
    const screen = await render(
      <div style={{ position: 'fixed', bottom: 20, left: 100 }}>
        <Menu items={many}>
          <button type="button">More</button>
        </Menu>
      </div>,
    );
    const trigger = screen.getByRole('button', { name: 'More' });

    await trigger.click();
    await expect.element(screen.getByRole('menu')).toBeVisible();

    const list = document.querySelector('[role="menu"]') as HTMLElement;
    const listRect = list.getBoundingClientRect();
    const triggerRect = trigger.element().getBoundingClientRect();

    expect(listRect.top).toBeGreaterThanOrEqual(0);
    expect(listRect.bottom).toBeLessThanOrEqual(triggerRect.top);
  });

  it('moves across action and radio items alike', async () => {
    const { trigger, screen } = await renderMenu([
      { label: 'Archive', onSelect: vi.fn() },
      { type: 'separator' },
      {
        type: 'radio-group',
        value: 'dark',
        onChange: vi.fn(),
        items: [
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark', disabled: true },
          { value: 'system', label: 'System' },
        ],
      },
    ]);

    await trigger.click();
    expect(focused()).toBe('Archive');

    await userEvent.keyboard('{ArrowDown}');
    expect(focused()).toBe('Light');

    await userEvent.keyboard('{ArrowDown}');
    expect(focused()).toBe('System');

    await userEvent.keyboard('{ArrowDown}');
    expect(focused()).toBe('Archive');

    await userEvent.keyboard('{End}');
    expect(focused()).toBe('System');

    await screen
      .getByRole('menuitemradio', { name: 'Light', exact: true })
      .hover();
    expect(focused()).toBe('Light');
  });

  it('picks a radio item with Enter and returns focus to the trigger', async () => {
    const onChange = vi.fn();
    const { trigger } = await renderMenu([
      {
        type: 'radio-group',
        value: 'light',
        onChange,
        items: [
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
        ],
      },
    ]);

    await trigger.click();
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');

    expect(onChange).toHaveBeenCalledWith('dark');
    await expect.element(trigger).toHaveFocus();
    await expectClosed();
  });
});
