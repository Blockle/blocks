import { useRef, useState } from 'react';

import preview from '../../../../../../.storybook/preview.js';
import { IconButton } from '../../form/IconButton/IconButton.js';
import { Stack } from '../../layout/Stack/Stack.js';
import { Text } from '../../typography/Text/Text.js';
import { Tab } from './Tab.js';
import { TabList } from './TabList.js';
import { TabPanel } from './TabPanel.js';
import { Tabs } from './Tabs.js';

const meta = preview.meta({
  title: 'Navigation/Tabs',
  component: Tabs,
});

export const Uncontrolled = meta.story({
  render: () => (
    <Tabs defaultValue="overview">
      <TabList aria-label="Project">
        <Tab value="overview">Overview</Tab>
        <Tab value="activity">Activity</Tab>
        <Tab value="settings">Settings</Tab>
      </TabList>
      <TabPanel value="overview">
        <Text>Overview content</Text>
      </TabPanel>
      <TabPanel value="activity">
        <Text>Activity content</Text>
      </TabPanel>
      <TabPanel value="settings">
        <Text>Settings content</Text>
      </TabPanel>
    </Tabs>
  ),
});

export const Controlled = meta.story({
  render: () => {
    const [value, setValue] = useState('activity');

    return (
      <Stack gap={4}>
        <Text>Selected: {value}</Text>
        <Tabs value={value} onValueChange={setValue}>
          <TabList aria-label="Project">
            <Tab value="overview">Overview</Tab>
            <Tab value="activity">Activity</Tab>
            <Tab value="settings">Settings</Tab>
          </TabList>
          <TabPanel value="overview">
            <Text>Overview content</Text>
          </TabPanel>
          <TabPanel value="activity">
            <Text>Activity content</Text>
          </TabPanel>
          <TabPanel value="settings">
            <Text>Settings content</Text>
          </TabPanel>
        </Tabs>
      </Stack>
    );
  },
});

const CloseIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    width="12"
    height="12"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const StatusDot: React.FC<{ status: string }> = ({ status }) => (
  <span
    role="img"
    aria-label={status}
    style={{
      display: 'block',
      inlineSize: 8,
      blockSize: 8,
      borderRadius: '50%',
      backgroundColor: status === 'running' ? 'seagreen' : 'gray',
    }}
  />
);

type Chat = { id: string; title: string; status: 'running' | 'idle' };

const initialChats: Chat[] = [
  { id: 'a', title: 'Release notes', status: 'running' },
  { id: 'b', title: 'Bug triage', status: 'idle' },
  { id: 'c', title: 'Draft reply', status: 'idle' },
  { id: 'd', title: 'Planning', status: 'running' },
];

/**
 * Blocks builds in no close button: compose an IconButton in `endSlot`. When
 * the selected tab closes, pick a neighbour and move focus to it yourself.
 */
export const ClosableTabs = meta.story({
  render: () => {
    const [chats, setChats] = useState(initialChats);
    const [value, setValue] = useState('a');
    const listRef = useRef<HTMLDivElement>(null);

    const close = (id: string) => {
      const index = chats.findIndex((chat) => chat.id === id);
      const remaining = chats.filter((chat) => chat.id !== id);

      setChats(remaining);

      if (id !== value) {
        return;
      }

      const next = remaining[Math.min(index, remaining.length - 1)];

      if (!next) {
        return;
      }

      setValue(next.id);
      // Wait for the new tab to be selected (and in the tab order), then focus
      requestAnimationFrame(() => {
        listRef.current
          ?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]')
          ?.focus();
      });
    };

    return (
      <Tabs value={value} onValueChange={setValue}>
        <TabList ref={listRef} aria-label="Conversations">
          {chats.map((chat) => (
            <Tab
              key={chat.id}
              value={chat.id}
              startSlot={<StatusDot status={chat.status} />}
              endSlot={
                <IconButton
                  label={`Close ${chat.title}`}
                  size="small"
                  variant="ghost"
                  shape="circle"
                  intent="inherit"
                  onClick={() => close(chat.id)}
                >
                  <CloseIcon />
                </IconButton>
              }
            >
              {chat.title}
            </Tab>
          ))}
        </TabList>
        {chats.map((chat) => (
          <TabPanel key={chat.id} value={chat.id}>
            <Text>{chat.title} conversation</Text>
          </TabPanel>
        ))}
      </Tabs>
    );
  },
});
