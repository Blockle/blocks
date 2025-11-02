import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

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
    children: 'This is an alert message.',
    open: true,
    onRequestClose: action('onRequestClose'),
  },
};
