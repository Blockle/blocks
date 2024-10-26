import { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxProps } from './Checkbox';

export default {
  title: 'Form/Checkbox',
  component: Checkbox,
} as Meta;

export const Default: StoryObj<CheckboxProps> = {
  render: (props) => {
    return <Checkbox {...props} />;
  },
  args: {
    name: 'checkbox',
    children: 'Checkbox label',
    required: false,
    disabled: false,
  },
};
