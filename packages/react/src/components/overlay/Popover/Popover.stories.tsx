import { action } from 'storybook/actions';
import { useRef, useState } from 'storybook/preview-api';

import preview from '../../../../../../.storybook/preview.js';
import { Button } from '../../form/Button/Button.js';
import { Box } from '../../layout/Box/Box.js';
import { Popover } from './Popover.js';

const meta = preview.meta({
  title: 'Overlay/Popover',
  component: Popover,
});

export const Default = meta.story({
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
    onRequestClose: action('onRequestClose'),
    // biome-ignore lint/suspicious/noExplicitAny: ref is added in render function
    anchorElement: null as any,
    open: true,
  },
});

export const Interactive = meta.story({
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
    onRequestClose: action('onRequestClose'),
    // biome-ignore lint/suspicious/noExplicitAny: ref is added in render function
    anchorElement: null as any,
    open: true,
  },
});
