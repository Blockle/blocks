import { expect } from '@storybook/test';
import * as test from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { Link, LinkProps } from './Link';

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
    onClick: test.fn(() => {
      console.log('Link clicked');
    }),
  },
};

export const Play: StoryObj<LinkProps> = {
  render: (props) => {
    return <Link {...props} />;
  },

  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('link'));

    expect(args.onClick).toHaveBeenCalled();
  },

  args: {
    children: 'Link',
    href: 'https://example.com',
    underline: true,
    onClick: test.fn((event) => {
      event.preventDefault();

      console.log('Link clicked');
    }),
  },
};
