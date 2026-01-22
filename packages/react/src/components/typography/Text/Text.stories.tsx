import { atomicProperties } from '@blockle/blocks-core';

import preview from '../../../../../../.storybook/preview.js';
import { Text } from './Text.js';

const meta = preview.meta({
  title: 'Typography/Text',
  component: Text,
  argTypes: {
    fontSize: {
      name: 'fontSize',
      type: 'string',
      control: 'select',
      options: Object.keys(atomicProperties.fontSize.values),
    },
    textAlign: {
      name: 'textAlign',
      type: 'string',
      control: 'select',
      options: Object.keys(atomicProperties.textAlign.values),
    },
    lineHeight: {
      name: 'lineHeight',
      type: 'string',
      control: 'select',
      options: Object.keys(atomicProperties.lineHeight.values),
    },
  },
});

export const Default = meta.story({
  args: {
    ref: null,
    children:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
});
