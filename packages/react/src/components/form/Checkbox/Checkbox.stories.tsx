import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox, type CheckboxProps } from './Checkbox.js';

export default {
  title: 'Form/Checkbox',
  component: Checkbox,
} as Meta;

export const Default: StoryObj<CheckboxProps> = {
  render: (props) => {
    return <Checkbox {...props} />;
  },
};
