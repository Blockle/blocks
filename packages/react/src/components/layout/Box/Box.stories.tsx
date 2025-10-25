import { atomicProperties } from '@blockle/blocks-core';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Box, type BoxProps } from './Box.js';

export default {
  title: 'Layout/Box',
  component: Box,
  argTypes: {
    color: {
      control: 'select',
      options: Object.keys(atomicProperties.color.values),
    },
    backgroundColor: {
      control: 'select',
      options: Object.keys(atomicProperties.color.values),
    },
    padding: {
      control: 'select',
      options: Object.keys(atomicProperties.padding.values),
    },
  },
} as Meta;

export const Default: StoryObj<BoxProps> = {
  render(props) {
    return <Box {...props} />;
  },
  args: {
    children: 'Box contents',
  },
};

export const AsChild: StoryObj<BoxProps> = {
  render(props) {
    return <Box {...props} />;
  },
  args: {
    asChild: true,
    color: 'primary-700',
    children: (
      <a
        href="https://google.com"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          event.preventDefault();
          console.log('Link clicked');
        }}
      >
        Link text
      </a>
    ),
  },
};
