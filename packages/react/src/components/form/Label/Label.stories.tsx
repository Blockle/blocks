import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../../layout/Stack';
import { Input } from '../Input';
import { Label, type LabelProps } from './Label';

export default {
  title: 'Form/Label',
  component: Label,
} as Meta;

export const Default: StoryObj<LabelProps> = {
  render: (props) => {
    return <Label {...props} />;
  },
  args: {
    children: 'Label text',
  },
};
export const WithInput: StoryObj<LabelProps> = {
  render: (props) => {
    return (
      <Stack spacing="medium">
        <Label {...props} />
        <Input
          name="input"
          defaultValue="Blep"
          type="text"
          id={props.htmlFor}
        />
      </Stack>
    );
  },
  args: {
    children: 'Label text',
    htmlFor: 'input',
  },
};
