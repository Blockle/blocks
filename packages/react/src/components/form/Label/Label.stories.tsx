import type { Meta, StoryObj } from '@storybook/react-vite';

import { Stack } from '../../layout/Stack/Stack.js';
import { Input } from '../Input/Input.js';
import { Label, type LabelProps } from './Label.js';

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
      <Stack gap={2}>
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
