import { atomicProperties } from '@blockle/blocks-core';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Inline, type InlineProps } from './Inline.js';

export default {
  title: 'Layout/Inline',
  component: Inline,
  args: {
    gap: 'small',
  },
  argTypes: {
    gap: {
      name: 'gap',
      type: 'string',
      control: 'select',
      options: Object.keys(atomicProperties.gap.values),
    },
  },
} as Meta<typeof Inline>;

const Template: StoryFn<typeof Inline> = ({ ...args }) => <Inline {...args} />;

export const Default: StoryObj<InlineProps> = {
  render: Template,
  args: {
    children: (
      <>
        <div style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          1
        </div>
        <div style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          2
        </div>
        <div style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          3
        </div>
        <div style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          4
        </div>
        <div style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          5
        </div>
        <div style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          6
        </div>
        <div style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          7
        </div>
        <div style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          8
        </div>
        <div style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          9
        </div>
      </>
    ),
  },
};

export const List: StoryObj<InlineProps> = {
  render: Template,
  args: {
    children: (
      <>
        <li style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          1
        </li>
        <li style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          2
        </li>
        <li style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          3
        </li>
      </>
    ),
    tag: 'ol',
  },
};
