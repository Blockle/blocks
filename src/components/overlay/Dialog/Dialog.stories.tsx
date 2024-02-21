import { expect, jest } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { fireEvent, getByRole, userEvent, within } from '@storybook/testing-library';
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
      <Button variant="solid" onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      <div style={{ height: '2000px' }}></div>
      <Dialog {...props} open={open} onRequestClose={() => setOpen(false)} />
    </>
  );
};

const NestedDialog: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
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
        <Stack gap="medium">
          <Heading level={2}>Hello world!</Heading>
          <Text tag="p" fontSize="small">
            This is a dialog.
          </Text>
          <NestedDialog>
            One
            <NestedDialog>Two</NestedDialog>
          </NestedDialog>
          <form onSubmit={(event) => event.preventDefault()}>
            <Stack gap="small" alignX="center">
              {/* <Input name="firstName" label="First name" autoFocus /> */}
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </Stack>
      </>
    ),
    open: true,
    onRequestClose: jest.fn(() => {
      console.log('Dialog close requested');
    }),
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
        <Stack gap="medium">
          <Heading level={2}>Hello world</Heading>
          <Button type="submit">Close Dialog</Button>
        </Stack>
      </>
    ),
    onRequestClose: jest.fn(() => {
      console.log('Dialog clicked');
    }),
  },
};
