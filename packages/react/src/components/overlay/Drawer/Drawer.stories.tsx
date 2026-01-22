import { useState } from 'react';
import { action } from 'storybook/actions';

import preview from '../../../../../../.storybook/preview.js';
import { Button } from '../../form/Button/Button.js';
import { Drawer } from './Drawer.js';

const meta = preview.meta({
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
});

export const Default = meta.story({
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
    open: true,
    onRequestClose: action('Drawer close requested'),
  },
});
