import { useState } from 'react';

import preview from '../../../../../../.storybook/preview.js';
import { IconButton } from '../../form/IconButton/IconButton.js';
import { Inline } from '../../layout/Inline/Inline.js';
import { Stack } from '../../layout/Stack/Stack.js';
import { HeroIcon } from '../Icon/exampleIconMask.js';
import { Tag } from './Tag.js';

const intents = [
  'primary',
  'secondary',
  'neutral',
  'danger',
  'success',
  'info',
  'warning',
] as const;

const sizes = ['small', 'medium', 'large'] as const;

const meta = preview.meta({
  title: 'Display/Tag',
  component: Tag,
  argTypes: {
    intent: {
      control: 'select',
      options: intents,
    },
    size: {
      control: 'select',
      options: sizes,
    },
  },
});

const CloseIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const Default = meta.story({
  render: (props) => {
    return <Tag {...props} />;
  },

  args: {
    children: 'bug',
  },
});

export const Intents = meta.story({
  render: (props) => {
    return (
      <Inline gap={2}>
        {intents.map((intent) => (
          <Tag key={intent} {...props} intent={intent}>
            {intent}
          </Tag>
        ))}
      </Inline>
    );
  },

  args: {
    children: null,
  },
});

export const Sizes = meta.story({
  render: (props) => {
    return (
      <Inline gap={2} alignY="center">
        {sizes.map((size) => (
          <Tag key={size} {...props} size={size}>
            {size}
          </Tag>
        ))}
      </Inline>
    );
  },

  args: {
    children: null,
  },
});

export const StartSlot = meta.story({
  render: (props) => {
    return (
      <Stack gap={3}>
        {sizes.map((size) => (
          <Inline key={size} gap={2} alignY="center">
            <Tag {...props} size={size} intent="warning">
              Blocked
            </Tag>
            <Tag
              {...props}
              size={size}
              intent="warning"
              startSlot={<HeroIcon name="lock-closed" />}
            >
              Blocked
            </Tag>
            <Tag {...props} size={size} startSlot="🐛">
              bug
            </Tag>
            <Tag
              {...props}
              size={size}
              intent="primary"
              startSlot={<HeroIcon name="rectangle-stack" />}
            >
              Epic 2/4
            </Tag>
          </Inline>
        ))}
      </Stack>
    );
  },

  args: {
    children: null,
  },
});

const initialLabels = ['bug', 'enhancement', 'from:tandembike', 'docs'];

export const Removable = meta.story({
  render: (props) => {
    const [labels, setLabels] = useState(initialLabels);

    return (
      <Stack gap={3}>
        {sizes.map((size) => (
          <Inline
            key={size}
            gap={2}
            alignY="center"
            listStyle="none"
            padding={0}
            margin={0}
            asChild
          >
            <ul>
              {labels.map((label) => (
                <li key={label}>
                  <Tag
                    {...props}
                    size={size}
                    endSlot={
                      <IconButton
                        label={`Remove label ${label}`}
                        variant="ghost"
                        size="small"
                        shape="circle"
                        intent="inherit"
                        onClick={() =>
                          setLabels((current) =>
                            current.filter((item) => item !== label),
                          )
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                  >
                    {label}
                  </Tag>
                </li>
              ))}
            </ul>
          </Inline>
        ))}
      </Stack>
    );
  },

  args: {
    children: null,
  },
});

export const AsChild = meta.story({
  render: (props) => {
    return (
      <Tag {...props} asChild intent="info">
        <a href="#labels/docs">docs</a>
      </Tag>
    );
  },

  args: {
    children: null,
  },
});
