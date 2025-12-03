import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { HeroIcon } from '../../display/Icon/IconMask.stories.js';
import { Button } from './Button.js';

const meta = {
  title: 'Form/Button',
  component: Button,
  argTypes: {},
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (props) => {
    return (
      <Button
        {...props}
        startSlot={<HeroIcon name="academic-cap" size="small" />}
      />
    );
  },

  args: {
    children: 'Button',
    onClick: action('button-clicked'),
  },
};

export const LinkButton: Story = {
  render: (props) => {
    return <Button {...props} />;
  },

  args: {
    children: (
      <a href="https://google.com" target="_blank" rel="noreferrer">
        Link text
      </a>
    ),
    asChild: true,
    onClick: action('link-clicked'),
  },
};

// export const WithIcon: StoryObj<ButtonProps> = {
//   render: (props) => {
//     return (
//       <Stack gap="medium">
//         <Button startSlot={<Icon icon="star" />} {...props} />
//         <Button endSlot={<Icon icon="star" />} {...props} />
//         <Button startSlot={<Icon icon="star" />} endSlot={<Icon icon="star" />} {...props} />
//       </Stack>
//     );
//   },

//   args: {
//     children: 'Button',
//     onClick: jest.fn(() => {
//       console.log('Button clicked');
//     }),
//   },
// };
