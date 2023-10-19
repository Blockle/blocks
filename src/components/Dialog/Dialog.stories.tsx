import { jest } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Dialog, DialogProps } from './Dialog';

export default {
  title: 'Components/Dialog',
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
          <Text as="p" fontSize="small">
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

// export const Play: StoryObj<DialogProps> = {
//   render: DialogTemplate,

//   play: async ({ args, canvasElement }) => {
//     const canvas = within(canvasElement);

//     userEvent.click(canvas.getByRole('Dialog'));

//     expect(args.onClick).toHaveBeenCalled();
//   },

//   args: {
//     children: 'Dialog',
//     onClick: jest.fn(() => {
//       console.log('Dialog clicked');
//     }),
//   },
// };
