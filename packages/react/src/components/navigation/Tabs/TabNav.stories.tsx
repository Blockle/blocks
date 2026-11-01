import { useState } from 'react';

import preview from '../../../../../../.storybook/preview.js';
import { Stack } from '../../layout/Stack/Stack.js';
import { Tab } from './Tab.js';
import { TabNav } from './TabNav.js';

const meta = preview.meta({
  title: 'Navigation/TabNav',
  component: TabNav,
});

type RouterLinkProps = Omit<React.ComponentProps<'a'>, 'href'> & {
  to: string;
  onNavigate: (to: string) => void;
};

// Stands in for a router's Link: renders an anchor and navigates on click
const RouterLink: React.FC<RouterLinkProps> = ({
  onClick,
  onNavigate,
  to,
  ...props
}) => (
  <a
    href={to}
    onClick={(event) => {
      onClick?.(event);
      event.preventDefault();
      onNavigate(to);
    }}
    {...props}
  />
);

const routes = [
  { to: '/backlog', label: 'Backlog' },
  { to: '/cycles/3.3', label: 'Cycle 3.3' },
  { to: '/history', label: 'History' },
];

export const RouterLinks = meta.story({
  render: () => {
    const [path, setPath] = useState('/backlog');

    return (
      <Stack gap={4}>
        <TabNav aria-label="Project">
          {routes.map((route) => (
            <Tab key={route.to} asChild current={path === route.to}>
              <RouterLink to={route.to} onNavigate={setPath}>
                {route.label}
              </RouterLink>
            </Tab>
          ))}
        </TabNav>
        <p>Current page: {path}</p>
      </Stack>
    );
  },
});

const pages = Array.from({ length: 24 }, (_, i) => `Cycle ${i + 1}`);

export const Overflowing = meta.story({
  render: () => {
    const [current, setCurrent] = useState(pages[0] as string);

    return (
      <div style={{ width: 360 }}>
        <TabNav aria-label="Cycles">
          {pages.map((page) => (
            <Tab
              key={page}
              asChild
              current={current === page}
              startSlot={<span aria-hidden="true">•</span>}
            >
              <RouterLink to={`/${page}`} onNavigate={() => setCurrent(page)}>
                {page}
              </RouterLink>
            </Tab>
          ))}
        </TabNav>
      </div>
    );
  },
});
