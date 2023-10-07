import { expect, jest } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Link, LinkProps } from './Link';

export default {
  title: 'Link/Link',
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
    onClick: jest.fn(() => {
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

    userEvent.click(canvas.getByRole('Link'));

    expect(args.onClick).toHaveBeenCalled();
  },

  args: {
    children: 'Link',
    onClick: jest.fn(() => {
      console.log('Link clicked');
    }),
  },
};
