import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'storybook/preview-api';

import { Button } from '../../form/Button/Button.js';
import { Box } from '../../layout/Box/Box.js';
import { Popover, type PopoverProps } from './Popover.js';

export default {
  title: 'Overlay/Popover',
  component: Popover,
  argTypes: {},
} as Meta;

export const Default: StoryObj<PopoverProps> = {
  render: (props) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    return (
      <>
        <Button ref={buttonRef}>Anchor element</Button>
        <Popover {...props} anchorElement={buttonRef}>
          {props.children}
        </Popover>
      </>
    );
  },
  args: {
    children: 'Popover content',
    onRequestClose: () => {
      // do nothing
    },
  },
};

export const Interactive: StoryObj<PopoverProps> = {
  render: (props) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(props.open ?? false);

    return (
      <Box style={{ height: 1000, width: 1000 }}>
        <Box style={{ marginTop: 240, marginLeft: 240 }}>
          <Button ref={buttonRef} onClick={() => setOpen((open) => !open)}>
            Toggle
          </Button>
          <Popover
            {...props}
            anchorElement={buttonRef}
            open={open}
            onRequestClose={() => setOpen(false)}
          >
            {props.children}
          </Popover>
        </Box>
      </Box>
    );
  },

  args: {
    children: (
      <div>
        <ul style={{ paddingLeft: 12 }}>
          <li>Los barros el wacka</li>
          <li>Los barros el wacka</li>
          <li>Los barros el wacka</li>
          <li>Los barros el wacka</li>
        </ul>
      </div>
    ),
  },
};
