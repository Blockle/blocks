import { Meta, StoryObj } from '@storybook/react';
import { Label, LabelProps } from './Label';

export default {
  title: 'DataEntry/Label',
  component: Label,
} as Meta;

export const Default: StoryObj<LabelProps> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (props) => {
    return <Label {...props}>Label text</Label>;
  },
};
