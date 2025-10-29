import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toast, type ToastProps } from './Toast.js';

export default {
  title: 'Feedback/Toast',
  component: Toast,
  argTypes: {},
} as Meta;

export const Default: StoryObj<ToastProps> = {
  render: (props) => {
    return <Toast {...props} />;
  },

  args: {
    children: 'This is an toast message.',
  },
};
