import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert, type AlertProps } from './Alert.js';

export default {
  title: 'Feedback/Alert',
  component: Alert,
  argTypes: {},
} as Meta;

export const Default: StoryObj<AlertProps> = {
  render: (props) => {
    return <Alert {...props} />;
  },

  args: {
    title: 'Alert Title',
    children: 'This is an alert message.',
  },
};
