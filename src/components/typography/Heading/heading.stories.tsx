import { expect } from '@storybook/test';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';
import { responsiveProperties } from '../../../lib/css/atoms/atomicProperties';
import { Stack } from '../../layout/Stack';
import { Heading, HeadingProps } from './Heading';

export default {
  title: 'Typography/Heading',
  component: Heading,
  argTypes: {
    fontSize: {
      type: 'string',
      options: Object.keys(responsiveProperties.fontSize),
      control: {
        type: 'select',
      },
    },
    align: {
      type: 'string',
      options: Object.keys(responsiveProperties.textAlign),
      control: {
        type: 'select',
      },
    },
  },
} as Meta<typeof Heading>;

export const Default: StoryObj<HeadingProps> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByText(
        'Lorem Ipsum is simply dummy Heading of the printing and typesetting industry.',
      ),
    ).toBeInTheDocument();
  },

  args: {
    children:
      'Lorem Ipsum is simply dummy Heading of the printing and typesetting industry.',
    fontFamily: 'primary',
    level: 1,
  },
};

const TemplateAllHeadings: StoryFn<typeof Heading> = (args) => (
  <Stack spacing="medium">
    <Heading {...args} level={1}>
      Heading 1
    </Heading>
    <Heading {...args} level={2}>
      Heading 2
    </Heading>
    <Heading {...args} level={3}>
      Heading 3
    </Heading>
    <Heading {...args} level={4}>
      Heading 4
    </Heading>
  </Stack>
);

export const All = {
  render: TemplateAllHeadings,
};
