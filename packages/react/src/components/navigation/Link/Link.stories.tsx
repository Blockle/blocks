import { action } from 'storybook/actions';

import preview from '../../../../../../.storybook/preview.js';
import { Link } from './Link.js';

const meta = preview.meta({
  title: 'Navigation/Link',
  component: Link,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'inherit'],
    },
    underline: {
      control: 'boolean',
    },
  },
});

export const Default = meta.story({
  args: {
    children: 'Link',
    href: 'https://example.com',
    underline: true,
    onClick: action('Link clicked'),
  },
});
