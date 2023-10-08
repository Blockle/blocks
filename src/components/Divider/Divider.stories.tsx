import { expect, jest } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Divider, DividerProps } from './Divider';

export default {
  title: 'Components/Divider',
  component: Divider,
  // argTypes: {
  //   variant: {
  //     control: 'radio',
  //     options: ['primary', 'secondary', 'inherit'],
  //   },
  //   underline: {
  //     control: 'boolean',
  //   },
  // },
} as Meta;

export const Default: StoryObj<DividerProps> = {
  render: (props) => {
    return <Divider {...props} />;
  },
};
