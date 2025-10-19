import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { action } from 'storybook/actions';

import { Button } from '../../form/Button/Button.js';
import { Stack } from '../../layout/Stack/Stack.js';
import { Heading } from '../../typography/Heading/Heading.js';
import { Text } from '../../typography/Text/Text.js';
import { Dialog, type DialogProps } from './Dialog.js';

export default {
  title: 'Overlay/Dialog',
  component: Dialog,
  argTypes: {},
} as Meta;

const DialogTemplate: StoryObj<DialogProps>['render'] = (props) => {
  const [open, setOpen] = useState(props.open ?? false);

  return (
    <>
      <Button variant="solid" onClick={() => setOpen(true)} autoFocus>
        Open Dialog
      </Button>
      <div style={{ height: '2000px' }} />
      <div
        style={{
          width: 200,
          height: 200,
          overflow: 'hidden',
        }}
      >
        <Dialog {...props} open={open} onRequestClose={() => setOpen(false)} />
      </div>
    </>
  );
};

const NestedDialog: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} alignSelf="flex-end" autoFocus>
        Open dialog
      </Button>
      <Dialog open={open} onRequestClose={() => setOpen(false)}>
        {children}
      </Dialog>
    </>
  );
};

export const Default: StoryObj<DialogProps> = {
  args: {
    children: <>Test Dialog</>,
    open: true,
    onRequestClose: action('Dialog close requested'),
  },
};

export const Nested: StoryObj<DialogProps> = {
  render: DialogTemplate,
  args: {
    children: (
      <>
        <Stack spacing={2}>
          <Heading level={2}>Hello world!</Heading>
          <Text tag="p" fontSize="small">
            This is a dialog.
          </Text>

          <NestedDialog>
            One
            <NestedDialog>Two</NestedDialog>
          </NestedDialog>
        </Stack>
      </>
    ),
    open: true,
    onRequestClose: action('Dialog close requested'),
  },
};

export const WithAriaMarkup: StoryObj<DialogProps> = {
  render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>

        <Dialog
          open={open}
          onRequestClose={() => setOpen(false)}
          aria-labelledby="dialog-header"
          aria-describedby="dialog-body"
        >
          <header id="dialog-header">Dialog title</header>

          <p id="dialog-body">Some text</p>

          <footer>
            <Button autoFocus onClick={() => setOpen(false)}>
              Close
            </Button>
          </footer>
        </Dialog>
      </>
    );
  },
};

export const Play: StoryObj<DialogProps> = {
  render: DialogTemplate,
  args: {
    children: (
      <>
        <Stack spacing={2}>
          <Heading level={2}>Hello world</Heading>
          <Button type="submit" autoFocus>
            Close Dialog
          </Button>
        </Stack>
      </>
    ),
    onRequestClose: action('Dialog close requested'),
  },
};
