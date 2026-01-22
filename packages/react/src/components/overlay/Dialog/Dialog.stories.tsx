import { useState } from 'react';
import { action } from 'storybook/actions';

import preview from '../../../../../../.storybook/preview.js';
import { Button } from '../../form/Button/Button.js';
import { Stack } from '../../layout/Stack/Stack.js';
import { Heading } from '../../typography/Heading/Heading.js';
import { Text } from '../../typography/Text/Text.js';
import { Dialog, type DialogProps } from './Dialog.js';

const meta = preview.meta({
  title: 'Overlay/Dialog',
  component: Dialog,
  argTypes: {},
});

const DialogTemplate = (props: DialogProps) => {
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

export const Default = meta.story({
  args: {
    children: <>Test Dialog</>,
    open: true,
    onRequestClose: action('Dialog close requested'),
  },
});

export const Nested = meta.story({
  render: DialogTemplate,
  args: {
    children: (
      <>
        <Stack gap={2}>
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
});

export const WithAriaMarkup = meta.story({
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
});
