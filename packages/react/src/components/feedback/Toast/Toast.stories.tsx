import type { Meta, StoryObj } from '@storybook/react-vite';
import { type FC, useState } from 'react';
import { action } from 'storybook/actions';

import { Button } from '../../form/Button/Button.js';
import { Alert } from '../Alert/Alert.js';
import { Toast, type ToastProps } from './Toast.js';
import { ToastProvider } from './ToastProvider.js';

export default {
  title: 'Feedback/Toast',
  component: Toast,
  argTypes: {},
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} as Meta;

export const Default: StoryObj<ToastProps> = {
  render: ({ children, ...restProps }) => {
    return (
      <Toast {...restProps}>
        <Alert open intent="success" onRequestClose={restProps.onRequestClose}>
          {children}
        </Alert>
      </Toast>
    );
  },

  args: {
    children: 'This is a toast message.',
    open: true,
    onRequestClose: action('onRequestClose'),
  },
};

const ToastPlayground: FC = () => {
  const [toasts, setToasts] = useState<number[]>([]);
  const onRequestClose = (id: number) => () => {
    setToasts((prev) => prev.filter((toast) => toast !== id));
  };

  return (
    <>
      <Button
        onClick={() =>
          setToasts((prev) => [...prev, (Math.random() * 100_000) >> 0])
        }
      >
        Show Toast
      </Button>

      {toasts.map((id) => (
        <Toast
          key={id}
          open
          onRequestClose={onRequestClose(id)}
          // duration={30000 + Math.random() * 3000}
        >
          <Alert open onRequestClose={onRequestClose(id)} intent="success">
            This is toast
          </Alert>
        </Toast>
      ))}
    </>
  );
};

export const Playground: StoryObj<ToastProps> = {
  render: () => {
    return <ToastPlayground />;
  },
};
