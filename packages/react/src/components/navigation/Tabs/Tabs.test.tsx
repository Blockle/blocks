import { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import { testingTheme } from '../../../testUtils/testTheme.css.js';
import { BlocksProvider } from '../../providers/BlocksProvider/BlocksProvider.js';
import { Tab } from './Tab.js';
import { TabList } from './TabList.js';
import { TabPanel } from './TabPanel.js';
import { Tabs } from './Tabs.js';

const example = (
  <BlocksProvider theme={testingTheme}>
    <Tabs defaultValue="two">
      <TabList aria-label="Sections">
        <Tab value="one">One</Tab>
        <Tab value="two">Two</Tab>
      </TabList>
      <TabPanel value="one">First</TabPanel>
      <TabPanel value="two">Second</TabPanel>
    </Tabs>
  </BlocksProvider>
);

describe('Tabs (server rendering)', () => {
  it('renders the selected state into the markup and hydrates without a mismatch', async () => {
    const container = document.createElement('div');
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    container.innerHTML = renderToString(example);

    const selected = container.querySelectorAll('[aria-selected="true"]');
    const panels = container.querySelectorAll('[role="tabpanel"]');

    expect(selected).toHaveLength(1);
    expect(selected[0]?.textContent).toBe('Two');
    expect(panels[0]?.hasAttribute('hidden')).toBe(true);
    expect(panels[1]?.hasAttribute('hidden')).toBe(false);

    await act(async () => {
      hydrateRoot(container, example);
    });

    expect(error).not.toHaveBeenCalled();
    error.mockRestore();
  });
});
