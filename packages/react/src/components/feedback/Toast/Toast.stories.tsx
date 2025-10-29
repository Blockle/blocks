import type { Meta, StoryObj } from '@storybook/react-vite';
import { type FC, useState } from 'react';
import { action } from 'storybook/actions';

import { Button } from '../../form/Button/Button.js';
import { Toast, type ToastProps } from './Toast.js';
import { ToastProvider } from './ToastProvider.js';

export default {
  title: 'Feedback/Toast',
  component: Toast,
  argTypes: {},
} as Meta;

export const Default: StoryObj<ToastProps> = {
  render: (props) => {
    return (
      <ToastProvider>
        <Toast {...props} />
      </ToastProvider>
    );
  },

  args: {
    children: 'This is an toast message.',
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
    <ToastProvider>
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
          duration={3000 + Math.random() * 3000}
          intent="success"
        >
          This is toast #{id}
        </Toast>
      ))}
    </ToastProvider>
  );
};

export const Playground: StoryObj<ToastProps> = {
  render: () => {
    return <ToastPlayground />;
  },
};
