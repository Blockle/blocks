import { atomicProperties } from '@blockle/blocks-core';
import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { Stack } from '../../layout/Stack/Stack.js';
import { Heading, type HeadingProps } from './Heading.js';

export default {
  title: 'Typography/Heading',
  component: Heading,
  argTypes: {
    fontSize: {
      type: 'string',
      options: Object.keys(atomicProperties.fontSize.values),
      control: {
        type: 'select',
      },
    },
    align: {
      type: 'string',
      options: Object.keys(atomicProperties.textAlign.values),
      control: {
        type: 'select',
      },
    },
  },
} as Meta<typeof Heading>;

export const Default: StoryObj<HeadingProps> = {
  args: {
    children:
      'Lorem Ipsum is simply dummy Heading of the printing and typesetting industry.',
    fontFamily: 'heading',
    level: 1,
  },
};

const TemplateAllHeadings: StoryFn<typeof Heading> = (args) => (
  <Stack gap={2}>
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
