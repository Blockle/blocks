import { useState } from 'react';

import preview from '../../../../../../.storybook/preview.js';
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
