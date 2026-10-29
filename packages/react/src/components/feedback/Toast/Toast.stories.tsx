import preview from '../../../../../../.storybook/preview.js';
import { Button } from '../../form/Button/Button.js';
import type { Toast } from './ToastContext.js';
import { type ToastPlacement, ToastProvider } from './ToastProvider.js';
import { useToast } from './useToast.js';

const meta = preview.meta({
  title: 'Feedback/Toast',
  render: ({
    intent,
    duration,
    children,
  }: Omit<Toast, 'id'> & { placement?: ToastPlacement }) => {
    const { showToast } = useToast();

    return (
      <Button
        size="medium"
        onClick={() => {
          showToast({
            duration,
            children: children || 'This is a toast message',
            intent,
          });
        }}
      >
        Show Toast
      </Button>
    );
  },
  parameters: {
    docs: {
      description: {
        component:
          'A toast with a `duration` removes itself once that time has run. The countdown pauses while any toast is hovered or focused, or the page is hidden, and then continues with the time left. Leave out `duration` for a toast that contains an action, such as an "Undo" button, so nobody loses the action before they can use it.',
      },
    },
  },
  argTypes: {
    intent: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
    duration: {
      description:
        'Milliseconds before the toast removes itself. Leave it out for a toast that contains an action.',
      control: 'select',
      options: [0, 3000, 5000],
      labels: ['Persistent', '3 seconds', '5 seconds'],
    },
    children: {
      control: 'text',
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
      ] satisfies ToastPlacement[],
    },
  },
  decorators: [
    (Story, { args }) => (
      <ToastProvider placement={args.placement}>
        <Story />
      </ToastProvider>
    ),
  ],
});

export const Default = meta.story({
  args: {
    intent: 'info',
    duration: 3000,
    children: 'This is a toast message',
    placement: 'bottom',
  },
});

export const TopEnd = meta.story({
  args: {
    intent: 'success',
    duration: 3000,
    children: 'Saved',
    placement: 'top-end',
  },
});

export const BottomStart = meta.story({
  args: {
    intent: 'info',
    duration: 3000,
    children: 'Message sent',
    placement: 'bottom-start',
  },
});
