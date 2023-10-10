import { expect } from '@storybook/jest';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { Input, InputProps } from './Input';

export default {
  title: 'Components/Input',
  component: Input,
} as Meta<typeof Input>;

export const Default: StoryObj<InputProps> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByText(
        'Lorem Ipsum is simply dummy Input of the printing and typesetting industry.',
      ),
    ).toBeInTheDocument();
  },

  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
};

const TemplateAllInputs: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const All = {
  render: TemplateAllInputs,
};
