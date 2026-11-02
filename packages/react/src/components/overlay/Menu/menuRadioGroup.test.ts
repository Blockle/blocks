import { describe, expect, expectTypeOf, it, vi } from 'vitest';

import {
  type MenuItem,
  type MenuRadioGroupItem,
  type MenuRadioItem,
  menuRadioGroup,
} from './Menu.js';

type Mode = 'light' | 'dark' | 'system';

describe('menuRadioGroup', () => {
  it('returns the group unchanged', () => {
    const input = {
      type: 'radio-group' as const,
      value: 'a',
      onChange: vi.fn(),
      items: [{ value: 'a', label: 'A' }],
    };

    expect(menuRadioGroup(input)).toBe(input);
  });

  it('accepts a setter typed with a union without a cast', () => {
    const setMode = (_value: Mode) => {};
    const mode = 'system' as Mode;

    menuRadioGroup({
      type: 'radio-group',
      value: mode,
      onChange: setMode,
      items: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
      ],
    });
  });

  it('rejects an item value outside the union', () => {
    const setMode = (_value: Mode) => {};
    const mode = 'system' as Mode;

    menuRadioGroup({
      type: 'radio-group',
      value: mode,
      onChange: setMode,
      items: [
        // @ts-expect-error 'bogus' is not a Mode
        { value: 'bogus', label: '?' },
      ],
    });
  });

  it('mixes with other items in one items array', () => {
    const setMode = (_value: Mode) => {};
    const setSize = (_value: 'sm' | 'lg') => {};

    const items: MenuItem[] = [
      { label: 'Action', onSelect: () => {} },
      { type: 'separator' },
      menuRadioGroup({
        type: 'radio-group',
        value: 'light' as Mode,
        onChange: setMode,
        items: [{ value: 'light', label: 'Light' }],
      }),
      menuRadioGroup({
        type: 'radio-group',
        value: 'sm' as 'sm' | 'lg',
        onChange: setSize,
        items: [{ value: 'sm', label: 'Small' }],
      }),
    ];

    expectTypeOf(items).toEqualTypeOf<MenuItem[]>();
  });

  it('shares one V between the group and its items', () => {
    expectTypeOf<MenuRadioGroupItem>().toEqualTypeOf<
      MenuRadioGroupItem<string>
    >();
    expectTypeOf<MenuRadioItem>().toEqualTypeOf<MenuRadioItem<string>>();
    expectTypeOf<MenuRadioGroupItem<Mode>['value']>().toEqualTypeOf<Mode>();
    expectTypeOf<MenuRadioGroupItem<Mode>['onChange']>().toEqualTypeOf<
      (value: Mode) => void
    >();
    expectTypeOf<MenuRadioGroupItem<Mode>['items']>().toEqualTypeOf<
      MenuRadioItem<Mode>[]
    >();
  });

  it('keeps plain string object literals compiling', () => {
    const items: MenuItem[] = [
      {
        type: 'radio-group',
        value: 'a',
        onChange: (_value: string) => {},
        items: [{ value: 'a', label: 'A' }],
      },
    ];

    expectTypeOf(items).toEqualTypeOf<MenuItem[]>();
  });

  it('does not loosen plain literals', () => {
    const items: MenuItem[] = [
      {
        type: 'radio-group',
        value: 'a',
        // @ts-expect-error a number setter is not a string setter
        onChange: (_value: number) => {},
        items: [{ value: 'a', label: 'A' }],
      },
    ];

    expectTypeOf(items).toEqualTypeOf<MenuItem[]>();
  });
});
