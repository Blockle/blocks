import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Link, type LinkProps } from './Link.js';

export default {
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
} as Meta;

export const Default: StoryObj<LinkProps> = {
  render: (props) => {
    return <Link {...props} />;
  },

  args: {
    children: 'Link',
    href: 'https://example.com',
    underline: true,
    onClick: action('Link clicked'),
  },
};

export const Play: StoryObj<LinkProps> = {
  render: (props) => {
    return <Link {...props} />;
  },

  args: {
    children: 'Link',
    href: 'https://example.com',
    underline: true,
    onClick: action('Link clicked'),
  },
};
