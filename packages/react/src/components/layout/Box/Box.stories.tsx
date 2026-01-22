import { atomicProperties } from '@blockle/blocks-core';

import preview from '../../../../../../.storybook/preview.js';
import { Box } from './Box.js';

const meta = preview.meta({
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
});

export const Default = meta.story({
  args: {
    children: 'Box contents',
  },
});

export const AsChild = meta.story({
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
});
