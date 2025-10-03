import type { Meta, StoryObj } from '@storybook/react';
import { Spinner, type SpinnerProps } from './Spinner.js';

export default {
  title: 'Feedback/Spinner',
  component: Spinner,
} as Meta;

export const Default: StoryObj<SpinnerProps> = {
  render: (props) => {
    return <Spinner {...props} />;
  },
};
