import { describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';

import { render } from '../../../testUtils/browser/render.js';
import { IconButton } from '../../form/IconButton/IconButton.js';
import { Tab } from './Tab.js';
import { TabNav } from './TabNav.js';

// A router-style link: forwards props to an anchor
const RouterLink: React.FC<React.ComponentProps<'a'> & { to: string }> = ({
  to,
  ...props
}) => <a href={to} {...props} />;

const Example: React.FC<{ current?: string }> = ({ current = 'backlog' }) => (
  <TabNav aria-label="Project">
    <Tab asChild current={current === 'backlog'}>
      <RouterLink to="#backlog">Backlog</RouterLink>
    </Tab>
    <Tab asChild current={current === 'cycle'}>
      <RouterLink to="#cycle">Cycle</RouterLink>
    </Tab>
    <Tab asChild current={current === 'history'}>
      <RouterLink to="#history">History</RouterLink>
    </Tab>
  </TabNav>
);

describe('TabNav (browser)', () => {
  it('renders a named nav around a list of links, without tab roles', async () => {
    const screen = await render(<Example />);

    const nav = screen.getByRole('navigation', { name: 'Project' });
    await expect.element(nav).toBeInTheDocument();
    expect(nav.element().querySelectorAll('ul > li > a')).toHaveLength(3);
    expect(screen.getByRole('link').elements()).toHaveLength(3);
    expect(screen.getByRole('tablist').elements()).toHaveLength(0);
    expect(screen.getByRole('tab').elements()).toHaveLength(0);
    expect(nav.element().querySelector('[aria-selected]')).toBeNull();
  });

  it('renders the consumer link with the Tab styles and marks the current one', async () => {
    const screen = await render(<Example current="cycle" />);

    const cycle = screen.getByRole('link', { name: 'Cycle' }).element();
    const backlog = screen.getByRole('link', { name: 'Backlog' }).element();

    expect(cycle.tagName).toBe('A');
    expect(cycle.getAttribute('href')).toBe('#cycle');
    expect(cycle.className).not.toBe('');
    expect(cycle.getAttribute('aria-current')).toBe('page');
    expect(backlog.hasAttribute('aria-current')).toBe(false);
  });

  it('renders a plain anchor by default', async () => {
    const screen = await render(
      <TabNav aria-label="Plain">
        <Tab href="#a" current>
          A
        </Tab>
      </TabNav>,
    );

    const link = screen.getByRole('link', { name: 'A' }).element();

    expect(link.tagName).toBe('A');
    expect(link.getAttribute('aria-current')).toBe('page');
  });

  it('lines the Tab indicator up with the current tab', async () => {
    const screen = await render(<Example current="history" />);

    const wrapper = screen.getByRole('link', { name: 'History' }).element()
      .parentElement as HTMLElement;
    const indicator = screen
      .getByRole('navigation')
      .element()
      .querySelector('[data-tab-indicator]') as HTMLElement;

    const tabBox = wrapper.getBoundingClientRect();
    const barBox = indicator.getBoundingClientRect();

    expect(barBox.left).toBeCloseTo(tabBox.left, 0);
    expect(barBox.width).toBeCloseTo(tabBox.width, 0);
  });

  it('scrolls the current tab into view in an overflowing nav', async () => {
    const labels = Array.from({ length: 20 }, (_, i) => `Page ${i + 1}`);
    const screen = await render(
      <div style={{ width: 300 }}>
        <TabNav aria-label="Pages">
          {labels.map((label) => (
            <Tab key={label} href={`#${label}`} current={label === 'Page 20'}>
              {label}
            </Tab>
          ))}
        </TabNav>
      </div>,
    );

    const nav = screen.getByRole('navigation').element();
    const last = screen
      .getByRole('link', { name: 'Page 20', exact: true })
      .element();

    expect(nav.scrollWidth).toBeGreaterThan(nav.clientWidth);
    expect(nav.scrollLeft).toBeGreaterThan(0);
    expect(last.getBoundingClientRect().right).toBeLessThanOrEqual(
      nav.getBoundingClientRect().right + 1,
    );
  });

  it('supports startSlot and endSlot beside the link', async () => {
    const screen = await render(
      <TabNav aria-label="Slots">
        <Tab
          href="#a"
          current
          startSlot={<span data-testid="dot">dot</span>}
          endSlot={
            <IconButton label="Close A" size="small">
              x
            </IconButton>
          }
        >
          A
        </Tab>
      </TabNav>,
    );

    const link = screen.getByRole('link', { name: 'A' }).element();
    const wrapper = link.parentElement as HTMLElement;

    expect(wrapper.contains(page.getByTestId('dot').element())).toBe(true);
    expect(link.contains(page.getByTestId('dot').element())).toBe(false);
    expect(
      link.contains(screen.getByRole('button', { name: 'Close A' }).element()),
    ).toBe(false);
    expect(wrapper.contains(screen.getByRole('button').element())).toBe(true);
  });

  it('moves between links with Tab, not the arrow keys', async () => {
    const screen = await render(<Example />);

    await userEvent.tab();
    await expect
      .element(screen.getByRole('link', { name: 'Backlog' }))
      .toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    await expect
      .element(screen.getByRole('link', { name: 'Backlog' }))
      .toHaveFocus();

    await userEvent.tab();
    await expect
      .element(screen.getByRole('link', { name: 'Cycle' }))
      .toHaveFocus();
  });

  it('draws the focus ring inside the scrolling list so it is not clipped', async () => {
    const screen = await render(<Example />);

    await userEvent.tab();

    const link = screen.getByRole('link', { name: 'Backlog' }).element();

    expect(
      Number.parseFloat(getComputedStyle(link).outlineOffset),
    ).toBeLessThan(0);
  });

  it('matches the screenshot', async () => {
    await render(
      <div style={{ padding: 16, inlineSize: 400 }} data-testid="frame">
        <Example current="cycle" />
      </div>,
      { colorMode: 'light' },
    );

    await expect
      .element(page.getByTestId('frame'))
      .toMatchScreenshot('tabnav-light');
  });
});
