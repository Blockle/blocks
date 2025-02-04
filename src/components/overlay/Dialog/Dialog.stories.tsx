/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import * as test from '@storybook/test';
import {
  expect,
  fireEvent,
  getByRole,
  userEvent,
  within,
} from '@storybook/test';
import { useState } from 'react';
import { Button } from '../../form/Button';
import { Stack } from '../../layout/Stack';
import { Heading } from '../../typography/Heading';
import { Text } from '../../typography/Text';
import { Dialog, DialogProps } from './Dialog';

export default {
  title: 'Overlay/Dialog',
  component: Dialog,
  argTypes: {},
} as Meta;

const DialogTemplate: StoryObj<DialogProps>['render'] = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="solid" onClick={() => setOpen(true)} autoFocus>
        Open Dialog
      </Button>
      <div style={{ height: '2000px' }}></div>
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
      <Button onClick={() => setOpen(true)} autoFocus>
        Open dialog
      </Button>
      <Dialog open={open} onRequestClose={() => setOpen(false)}>
        {children}
      </Dialog>
    </>
  );
};

export const Default: StoryObj<DialogProps> = {
  render: DialogTemplate,

  args: {
    children: (
      <>
        <Stack spacing="medium">
          <Heading level={2}>Hello world!</Heading>
          <Text tag="p" fontSize="small">
            This is a dialog.
          </Text>
          <form onSubmit={(event) => event.preventDefault()}>
            <Stack spacing="small" alignX="center">
              {/* <Input name="firstName" label="First name" autoFocus /> */}
              <Button type="submit" autoFocus>
                Submit
              </Button>
            </Stack>
          </form>

          <NestedDialog>
            One
            <NestedDialog>Two</NestedDialog>
          </NestedDialog>
        </Stack>
      </>
    ),
    open: true,
    onRequestClose: test.fn(() => {
      console.log('Dialog close requested');
    }),
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

  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    // Open dialog
    await userEvent.click(canvas.getByRole('button', { name: 'Open Dialog' }));

    const dialog = getByRole(document.body, 'dialog');

    expect(dialog).toBeInTheDocument();

    fireEvent.keyDown(dialog, { key: 'Escape' });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(dialog).not.toBeInTheDocument();
  },

  args: {
    children: (
      <>
        <Stack spacing="medium">
          <Heading level={2}>Hello world</Heading>
          <Button type="submit" autoFocus>
            Close Dialog
          </Button>
        </Stack>
      </>
    ),
    onRequestClose: test.fn(() => {
      console.log('Dialog clicked');
    }),
  },
};
