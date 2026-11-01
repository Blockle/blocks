import { fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { render, screen, waitFor } from '../../../testUtils/testUtils.js';
import { Menu, type MenuItem, type MenuProps } from './Menu.js';

function renderMenu(
  props: Partial<MenuProps> = {},
  items: MenuItem[] = [
    { label: 'Archive', onSelect: vi.fn() },
    { label: 'Rename', onSelect: vi.fn() },
    { type: 'separator' },
    { label: 'Delete', onSelect: vi.fn() },
  ],
) {
  return render(
    <>
      <Menu items={items} {...props}>
        <button type="button">More</button>
      </Menu>
      <button type="button">Next</button>
    </>,
  );
}

const trigger = () => screen.getByRole('button', { name: 'More' });

describe('Menu', () => {
  it('renders only the trigger while closed', () => {
    renderMenu();

    expect(screen.queryByRole('menu')).toBeNull();
    expect(trigger()).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
  });

  it('wires the trigger to the list and the list to the trigger', async () => {
    const user = userEvent.setup();

    renderMenu();
    await user.click(trigger());

    const menu = await screen.findByRole('menu', { name: 'More' });

    expect(trigger()).toHaveAttribute('aria-expanded', 'true');
    expect(trigger()).toHaveAttribute('aria-controls', menu.id);
    expect(menu).toHaveAttribute('aria-labelledby', trigger().id);
  });

  it('gives items and separators their roles', async () => {
    const user = userEvent.setup();

    renderMenu();
    await user.click(trigger());

    expect(await screen.findAllByRole('menuitem')).toHaveLength(3);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('puts className, style and data attributes on the list', async () => {
    const user = userEvent.setup();

    renderMenu({
      className: 'custom',
      style: { color: 'red' },
      'data-testid': 'list',
    } as Partial<MenuProps>);
    await user.click(trigger());

    const list = await screen.findByRole('menu');

    expect(list).toHaveClass('custom');
    expect(list).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    expect(list).toHaveAttribute('data-testid', 'list');
  });

  it('keeps the trigger own ref and onClick', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLButtonElement>();
    const onClick = vi.fn();

    render(
      <Menu items={[{ label: 'A', onSelect: vi.fn() }]}>
        <button type="button" ref={ref} onClick={onClick}>
          More
        </button>
      </Menu>,
    );
    await user.click(trigger());

    expect(ref.current).toBe(trigger());
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(await screen.findByRole('menu')).toBeInTheDocument();
  });

  it('keeps the trigger id', async () => {
    const user = userEvent.setup();

    render(
      <Menu items={[{ label: 'A', onSelect: vi.fn() }]}>
        <button type="button" id="mine">
          More
        </button>
      </Menu>,
    );
    await user.click(trigger());

    expect(await screen.findByRole('menu')).toHaveAttribute(
      'aria-labelledby',
      'mine',
    );
  });

  describe('opening', () => {
    it('opens on the first item with a click', async () => {
      const user = userEvent.setup();

      renderMenu();
      await user.click(trigger());

      await waitFor(() =>
        expect(screen.getByRole('menuitem', { name: 'Archive' })).toHaveFocus(),
      );
    });

    it('skips a disabled first item', async () => {
      const user = userEvent.setup();

      renderMenu({}, [
        { label: 'Archive', onSelect: vi.fn(), disabled: true },
        { label: 'Rename', onSelect: vi.fn() },
      ]);
      await user.click(trigger());

      await waitFor(() =>
        expect(screen.getByRole('menuitem', { name: 'Rename' })).toHaveFocus(),
      );
    });

    it.each([
      '{Enter}',
      ' ',
      '{ArrowDown}',
    ])('opens on the first item with %j', async (key) => {
      const user = userEvent.setup();

      renderMenu();
      trigger().focus();
      await user.keyboard(key);

      await waitFor(() =>
        expect(screen.getByRole('menuitem', { name: 'Archive' })).toHaveFocus(),
      );
    });

    it('opens on the last item with ArrowUp', async () => {
      const user = userEvent.setup();

      renderMenu();
      trigger().focus();
      await user.keyboard('{ArrowUp}');

      await waitFor(() =>
        expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus(),
      );
    });

    it('closes when the trigger is clicked again', async () => {
      const user = userEvent.setup();

      renderMenu();
      await user.click(trigger());
      await screen.findByRole('menu');
      await user.click(trigger());

      await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
    });

    it('does not open without items', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      renderMenu({ onOpenChange }, []);
      await user.click(trigger());

      expect(screen.queryByRole('menu')).toBeNull();
      expect(trigger()).toHaveAttribute('aria-expanded', 'false');
      expect(onOpenChange).not.toHaveBeenCalled();
    });
  });

  describe('keyboard navigation', () => {
    async function openMenu(items?: MenuItem[]) {
      const user = userEvent.setup();

      renderMenu({}, items);
      await user.click(trigger());
      await waitFor(() =>
        expect(screen.getAllByRole('menuitem')[0]).toHaveFocus(),
      );

      return user;
    }

    it('moves with the arrow keys and wraps', async () => {
      const user = await openMenu();

      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('menuitem', { name: 'Rename' })).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('menuitem', { name: 'Archive' })).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();
    });

    it('jumps with Home and End', async () => {
      const user = await openMenu();

      await user.keyboard('{End}');
      expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();

      await user.keyboard('{Home}');
      expect(screen.getByRole('menuitem', { name: 'Archive' })).toHaveFocus();
    });

    it('skips disabled items', async () => {
      const user = await openMenu([
        { label: 'One', onSelect: vi.fn() },
        { label: 'Two', onSelect: vi.fn(), disabled: true },
        { label: 'Three', onSelect: vi.fn() },
        { label: 'Four', onSelect: vi.fn(), disabled: true },
      ]);

      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('menuitem', { name: 'Three' })).toHaveFocus();

      await user.keyboard('{End}');
      expect(screen.getByRole('menuitem', { name: 'Three' })).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('menuitem', { name: 'One' })).toHaveFocus();
    });

    it('focuses an item on hover', async () => {
      const user = await openMenu();

      await user.hover(screen.getByRole('menuitem', { name: 'Delete' }));

      expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();
    });
  });

  describe('picking', () => {
    it('calls onSelect, closes and returns focus to the trigger', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      renderMenu({}, [{ label: 'Archive', onSelect }]);
      await user.click(trigger());
      await user.click(await screen.findByRole('menuitem'));

      expect(onSelect).toHaveBeenCalledTimes(1);
      await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
      expect(trigger()).toHaveFocus();
    });

    it('picks the focused item with Enter', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      renderMenu({}, [
        { label: 'One', onSelect: vi.fn() },
        { label: 'Two', onSelect },
      ]);
      await user.click(trigger());
      await screen.findByRole('menu');
      await user.keyboard('{ArrowDown}{Enter}');

      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(trigger()).toHaveFocus();
    });

    it('cannot pick a disabled item', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      renderMenu({}, [
        { label: 'One', onSelect: vi.fn() },
        { label: 'Two', onSelect, disabled: true },
      ]);
      await user.click(trigger());
      await user.click(await screen.findByRole('menuitem', { name: 'Two' }));

      expect(onSelect).not.toHaveBeenCalled();
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('renders slots', async () => {
      const user = userEvent.setup();

      renderMenu({}, [
        {
          label: 'Archive',
          onSelect: vi.fn(),
          startSlot: <i data-testid="start" />,
          endSlot: <kbd>A</kbd>,
        },
      ]);
      await user.click(trigger());

      expect(await screen.findByTestId('start')).toBeInTheDocument();
      expect(screen.getByText('A')).toBeInTheDocument();
    });
  });

  describe('closing', () => {
    it('closes with Escape and returns focus to the trigger', async () => {
      const user = userEvent.setup();

      renderMenu();
      await user.click(trigger());
      await screen.findByRole('menu');
      await user.keyboard('{Escape}');

      await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
      expect(trigger()).toHaveFocus();
    });

    it('closes with Tab and lets focus move on', async () => {
      const user = userEvent.setup();

      renderMenu();
      await user.click(trigger());
      await screen.findByRole('menu');
      await user.tab();

      await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
      expect(trigger()).not.toHaveFocus();
    });

    it('closes on an outside click', async () => {
      const user = userEvent.setup();

      renderMenu();
      await user.click(trigger());
      await screen.findByRole('menu');
      await user.click(screen.getByRole('button', { name: 'Next' }));

      await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
    });
  });

  describe('open state', () => {
    it('is controlled by open and onOpenChange', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      const { rerender } = render(
        <Menu
          items={[{ label: 'A', onSelect: vi.fn() }]}
          open={false}
          onOpenChange={onOpenChange}
        >
          <button type="button">More</button>
        </Menu>,
      );

      await user.click(trigger());

      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(screen.queryByRole('menu')).toBeNull();

      rerender(
        <Menu
          items={[{ label: 'A', onSelect: vi.fn() }]}
          open
          onOpenChange={onOpenChange}
        >
          <button type="button">More</button>
        </Menu>,
      );

      expect(await screen.findByRole('menu')).toBeInTheDocument();
    });

    it('reports changes while uncontrolled', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      renderMenu({ onOpenChange });
      await user.click(trigger());
      await screen.findByRole('menu');
      await user.keyboard('{Escape}');

      expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
    });

    it('works inside a stateful parent', async () => {
      const user = userEvent.setup();

      function Parent() {
        const [open, setOpen] = useState(false);

        return (
          <Menu
            items={[{ label: 'A', onSelect: vi.fn() }]}
            open={open}
            onOpenChange={setOpen}
          >
            <button type="button">More</button>
          </Menu>
        );
      }

      render(<Parent />);
      await user.click(trigger());
      expect(await screen.findByRole('menu')).toBeInTheDocument();

      await user.click(screen.getByRole('menuitem'));
      await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
    });
  });

  describe('typeahead', () => {
    const items: MenuItem[] = [
      { label: 'Archive', onSelect: vi.fn() },
      { label: 'Rename', onSelect: vi.fn() },
      { label: 'Remove', onSelect: vi.fn(), disabled: true },
      { label: 'Reset', onSelect: vi.fn() },
      { label: <b>Icon</b>, textValue: 'Duplicate', onSelect: vi.fn() },
      { label: <b>No text</b>, onSelect: vi.fn() },
    ];

    const focused = () => document.activeElement?.textContent;

    async function openMenu(menuItems = items) {
      const user = userEvent.setup();

      renderMenu({}, menuItems);
      await user.click(trigger());
      await screen.findByRole('menu');
      await waitFor(() => expect(focused()).toBe('Archive'));

      // Only the typeahead pause runs on fake time
      vi.useFakeTimers();

      return (key: string, init: KeyboardEventInit = {}) => {
        fireEvent.keyDown(document.activeElement as Element, { key, ...init });
      };
    }

    afterEach(() => {
      vi.useRealTimers();
    });

    it('focuses the next enabled item starting with the typed character, wrapping', async () => {
      const type = await openMenu();

      type('r');
      expect(focused()).toBe('Rename');

      type('r');
      expect(focused()).toBe('Reset');

      type('r');
      expect(focused()).toBe('Rename');
    });

    it('matches case-insensitively', async () => {
      const type = await openMenu();

      type('R');
      expect(focused()).toBe('Rename');
    });

    it('builds a longer prefix from quick keystrokes', async () => {
      const type = await openMenu();

      type('r');
      type('e');
      type('s');
      expect(focused()).toBe('Reset');
    });

    it('resets the search after a pause', async () => {
      const type = await openMenu();

      type('r');
      expect(focused()).toBe('Rename');

      await vi.advanceTimersByTimeAsync(1000);

      // Without the reset this would search for "re" then "res"/"rs"
      type('a');
      expect(focused()).toBe('Archive');
    });

    it('uses textValue and skips items without text', async () => {
      const type = await openMenu();

      type('d');
      expect(focused()).toBe('Icon');

      await vi.advanceTimersByTimeAsync(1000);
      type('n');
      expect(focused()).toBe('Icon');
    });

    it('ignores keys with modifiers held', async () => {
      const type = await openMenu();

      type('r', { ctrlKey: true });
      expect(focused()).toBe('Archive');
    });

    it('does nothing while the menu is closed', async () => {
      renderMenu({}, items);
      trigger().focus();
      fireEvent.keyDown(trigger(), { key: 'r' });

      expect(screen.queryByRole('menu')).toBeNull();
      expect(trigger()).toHaveFocus();
    });

    it('matches radio items by their text', async () => {
      const type = await openMenu([
        { label: 'Archive', onSelect: vi.fn() },
        {
          type: 'radio-group',
          value: 'light',
          onChange: vi.fn(),
          items: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark', textValue: 'Night' },
          ],
        },
      ]);

      type('n');
      expect(focused()).toBe('Dark');

      type('l');
      expect(focused()).toBe('Dark');
    });
  });

  describe('radio group', () => {
    const radioItems = (onChange = vi.fn(), value = 'dark'): MenuItem[] => [
      { label: 'Archive', onSelect: vi.fn() },
      { type: 'separator' },
      {
        type: 'radio-group',
        value,
        onChange,
        items: [
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark', textValue: 'Dark mode' },
          { value: 'system', label: 'System', disabled: true },
        ],
      },
    ];

    it('renders menuitemradio items checked by value', async () => {
      const user = userEvent.setup();

      renderMenu({}, radioItems());
      await user.click(trigger());

      const radios = await screen.findAllByRole('menuitemradio');

      expect(radios.map((radio) => radio.textContent)).toEqual([
        'Light',
        'Dark',
        'System',
      ]);
      expect(radios.map((radio) => radio.getAttribute('aria-checked'))).toEqual(
        ['false', 'true', 'false'],
      );
      expect(radios[2]).toHaveAttribute('aria-disabled', 'true');
    });

    it('draws the check only on the checked item and keeps room on the others', async () => {
      const user = userEvent.setup();

      renderMenu({}, radioItems());
      await user.click(trigger());

      const [light, dark] = await screen.findAllByRole('menuitemradio');

      expect(light?.querySelector('svg')).toBeNull();
      expect(dark?.querySelector('svg')).not.toBeNull();
      expect(light?.querySelector('[data-radio-indicator]')).not.toBeNull();
      expect(dark?.querySelector('[data-radio-indicator]')).not.toBeNull();
    });

    it('exposes text for typeahead', async () => {
      const user = userEvent.setup();

      renderMenu({}, radioItems());
      await user.click(trigger());

      const [light, dark] = await screen.findAllByRole('menuitemradio');

      expect(light).toHaveAttribute('data-text-value', 'Light');
      expect(dark).toHaveAttribute('data-text-value', 'Dark mode');
    });

    it('calls onChange with the value and closes', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      renderMenu({}, radioItems(onChange));
      await user.click(trigger());
      await user.click(
        await screen.findByRole('menuitemradio', { name: 'Light' }),
      );

      expect(onChange).toHaveBeenCalledWith('light');
      await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
      expect(trigger()).toHaveFocus();
    });

    it('does not pick disabled items', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      renderMenu({}, radioItems(onChange));
      await user.click(trigger());
      await user.click(
        await screen.findByRole('menuitemradio', { name: 'System' }),
      );

      expect(onChange).not.toHaveBeenCalled();
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });
});
