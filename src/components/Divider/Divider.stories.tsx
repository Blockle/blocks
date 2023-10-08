import { Meta, StoryObj } from '@storybook/react';
import { Divider, DividerProps } from './Divider';

export default {
  title: 'Components/Divider',
  component: Divider,
} as Meta;

export const Default: StoryObj<DividerProps> = {
  render: (props) => {
    return <Divider {...props} />;
  },
};
