import { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Dropdown, DropdownProps } from './Dropdown';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {},
} as Meta;

export const Default: StoryObj<DropdownProps> = {
  render: (props) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    // Potentially useful for later
    // const dropdown = useDropdownState({
    //   align: 'bottom',
    //   target: ref.current,
    //   onRequestClose: () => {},
    // });

    return (
      <Box style={{ height: 1000, width: 1000 }}>
        <Box style={{ marginTop: 240, marginLeft: 240 }}>
          <Button ref={buttonRef} onClick={() => setOpen((open) => !open)}>
            Toggle
          </Button>
          <Dropdown anchorElement={buttonRef} open={open} align={props.align}>
            {props.children}
          </Dropdown>
        </Box>
      </Box>
    );
  },

  args: {
    children: (
      <div>
        {/* TODO Fix list styling */}
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
