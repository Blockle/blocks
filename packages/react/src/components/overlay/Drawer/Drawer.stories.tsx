import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../../form/Button/Button.js';
import { Drawer, type DrawerProps } from './Drawer.js';

export default {
  title: 'Overlay/Drawer',
  component: Drawer,
  argTypes: {
    placement: {
      control: 'radio',
      options: ['left', 'right', 'top', 'bottom'],
    },
    open: {
      control: 'boolean',
    },
  },
} as Meta;

export const Default: StoryObj<DrawerProps> = {
  render: (props) => {
    const [open, setOpen] = useState(props.open ?? false);

    const toggleDrawer = () => {
      setOpen(!open);
    };

    return (
      <>
        <Button onClick={toggleDrawer}>Toggle Drawer</Button>
        <Drawer {...props} open={open} onRequestClose={toggleDrawer} />
      </>
    );
  },

  args: {
    children: 'Drawer',
  },
};
