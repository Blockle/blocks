import { Meta, StoryObj } from '@storybook/react';
import { Spinner, SpinnerProps } from './Spinner';

export default {
  title: 'Feedback/Spinner',
  component: Spinner,
  // argTypes: {},
} as Meta;

export const Default: StoryObj<SpinnerProps> = {
  render: (props) => {
    return <Spinner {...props} />;
  },
};

// export const Play: StoryObj<SpinnerProps> = {
//   render: (props) => {
//     return <Spinner {...props} />;
//   },
// };
