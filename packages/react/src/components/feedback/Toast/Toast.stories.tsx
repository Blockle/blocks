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
  argTypes: {
    intent: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
    duration: {
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
