import { useState } from 'react';

import preview from '../../../../../../.storybook/preview.js';
import { Button } from '../../form/Button/Button.js';
import { Box } from '../../layout/Box/Box.js';
import { Menu, type MenuItem, type MenuProps, menuRadioGroup } from './Menu.js';

type ColorModeSetting = 'light' | 'dark' | 'system';

const meta = preview.meta({
  title: 'Overlay/Menu',
  component: Menu,
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
    },
  },
});

const actions: MenuItem[] = [
  { label: 'Archive', onSelect: () => {}, endSlot: <small>A</small> },
  { label: 'Rename', onSelect: () => {} },
  { type: 'separator' },
  { label: 'Move', onSelect: () => {}, disabled: true },
  { label: 'Delete', onSelect: () => {} },
];

export const Default = meta.story({
  render(props) {
    return (
      <Box style={{ height: 400, padding: 40 }}>
        <Menu {...props}>
          <Button variant="outline">Actions</Button>
        </Menu>
      </Box>
    );
  },

  args: {
    children: <i>ignored prop</i>,
    items: actions,
  },
});

export const Placement = meta.story({
  render(props) {
    return (
      <Box style={{ height: 600, width: 600, padding: 240 }}>
        <Menu {...props}>
          <Button variant="outline">Actions</Button>
        </Menu>
      </Box>
    );
  },

  args: {
    children: <i>ignored prop</i>,
    items: actions,
    placement: 'right-start',
  },
});

export const LongList = meta.story({
  render(props) {
    return (
      <Box style={{ height: 400, padding: 40 }}>
        <Menu {...props}>
          <Button variant="outline">Pick one</Button>
        </Menu>
      </Box>
    );
  },

  args: {
    children: <i>ignored prop</i>,
    items: Array.from({ length: 60 }, (_, index) => ({
      label: `Item ${index + 1}`,
      onSelect: () => {},
    })),
  },
});

export const Empty = meta.story({
  render(props) {
    return (
      <Box style={{ height: 400, padding: 40 }}>
        <Menu {...props}>
          <Button variant="outline">Nothing to do</Button>
        </Menu>
      </Box>
    );
  },

  args: {
    children: <i>ignored prop</i>,
    items: [],
  },
});

const ControlledMenu: React.FC<MenuProps> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <Box style={{ height: 400, padding: 40 }}>
      <Menu {...props} open={open} onOpenChange={setOpen}>
        <Button variant="outline">{open ? 'Open' : 'Closed'}</Button>
      </Menu>
    </Box>
  );
};

export const Controlled = meta.story({
  render(props) {
    return <ControlledMenu {...props} />;
  },

  args: {
    children: <i>ignored prop</i>,
    items: actions,
  },
});

const ColorModeMenu: React.FC<MenuProps> = (props) => {
  const [colorMode, setColorMode] = useState<ColorModeSetting>('system');

  return (
    <Box style={{ height: 400, padding: 40 }}>
      <Menu
        {...props}
        items={[
          // menuRadioGroup() checks the item values against ColorModeSetting
          menuRadioGroup({
            value: colorMode,
            onChange: setColorMode,
            items: [
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'system', label: 'System' },
            ],
          }),
        ]}
      >
        <Button variant="outline">Color mode</Button>
      </Menu>
    </Box>
  );
};

export const ColorMode = meta.story({
  render(props) {
    return <ColorModeMenu {...props} />;
  },

  args: {
    children: <i>ignored prop</i>,
    items: [],
  },
});
