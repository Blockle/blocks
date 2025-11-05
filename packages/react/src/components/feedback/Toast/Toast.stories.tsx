import type { Meta } from '@storybook/react-vite';
import type { FC } from 'react';

import { Button } from '../../form/Button/Button.js';
import type { Toast } from './ToastContext.js';
import { ToastProvider } from './ToastProvider.js';
import { useToast } from './useToast.js';

export default {
  title: 'Feedback/Toast',
  component: () => null,
  argTypes: {
    intent: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    duration: {
      control: 'select',
      options: [0, 3000, 5000],
      labels: ['Persistent', '3 seconds', '5 seconds'],
    },
    children: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} as Meta;

export const Default: FC<Toast> = ({ intent, duration, children }) => {
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
};
