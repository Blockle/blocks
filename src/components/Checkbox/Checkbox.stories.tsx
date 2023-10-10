import { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxProps } from './Checkbox';

export default {
  title: 'DataEntry/Checkbox',
  component: Checkbox,
} as Meta;

export const Default: StoryObj<CheckboxProps> = {
  render: (props) => {
    return (
      <>
        <label>
          <Checkbox {...props} />
          <span>Checkbox</span>
        </label>
      </>
    );
  },
};
