import { vars } from '@blockle/blocks-core';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';

import { resolve } from '../../../testUtils/browser/contrast.js';
import { render } from '../../../testUtils/browser/render.js';
import { IconButton } from '../../form/IconButton/IconButton.js';
import { Tab } from './Tab.js';
import { TabList } from './TabList.js';
import { TabPanel } from './TabPanel.js';
import { Tabs, type TabsProps } from './Tabs.js';

const Example: React.FC<Partial<TabsProps>> = (props) => (
  <Tabs defaultValue="one" {...props}>
    <TabList aria-label="Sections">
      <Tab value="one">One</Tab>
      <Tab value="two">Two</Tab>
      <Tab value="three">Three</Tab>
    </TabList>
    <TabPanel value="one">First panel</TabPanel>
    <TabPanel value="two">Second panel</TabPanel>
    <TabPanel value="three">Third panel</TabPanel>
  </Tabs>
);

const CloseIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" fill="none" />
  </svg>
);

const SlotExample: React.FC<{ onClose?: () => void }> = ({ onClose }) => (
  <Tabs defaultValue="one">
    <TabList aria-label="Chats">
      <Tab
        value="one"
        startSlot={<span data-testid="dot-one">dot</span>}
        endSlot={
          <IconButton
            label="Close One"
            size="small"
            variant="ghost"
            shape="circle"
            intent="inherit"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        }
      >
        One
      </Tab>
      <Tab
        value="two"
        endSlot={
          <IconButton
            label="Close Two"
            size="small"
            variant="ghost"
            shape="circle"
            intent="inherit"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        }
      >
        Two
      </Tab>
    </TabList>
    <TabPanel value="one">First panel</TabPanel>
    <TabPanel value="two">Second panel</TabPanel>
  </Tabs>
);

describe('Tabs (browser)', () => {
  it('exposes a named tab list with tabs and a labelled tab panel', async () => {
    const screen = await render(<Example />);

    await expect
      .element(screen.getByRole('tablist', { name: 'Sections' }))
      .toBeVisible();

    const one = screen.getByRole('tab', { name: 'One' });
    const two = screen.getByRole('tab', { name: 'Two' });

    await expect.element(one).toHaveAttribute('aria-selected', 'true');
    await expect.element(two).toHaveAttribute('aria-selected', 'false');

    const panel = screen.getByRole('tabpanel', { name: 'One' });

    await expect.element(panel).toHaveTextContent('First panel');
    await expect.element(panel).toHaveAttribute('tabindex', '0');
    await expect
      .element(one)
      .toHaveAttribute('aria-controls', panel.element().id);
  });

  it('names the tab list through aria-labelledby', async () => {
    const screen = await render(
      <Tabs defaultValue="a">
        <h2 id="heading">Settings</h2>
        <TabList aria-labelledby="heading">
          <Tab value="a">A</Tab>
        </TabList>
        <TabPanel value="a">Panel</TabPanel>
      </Tabs>,
    );

    await expect
      .element(screen.getByRole('tablist', { name: 'Settings' }))
      .toBeVisible();
  });

  it('selects a tab by clicking and shows its panel', async () => {
    const screen = await render(<Example />);

    await screen.getByRole('tab', { name: 'Two' }).click();

    await expect
      .element(screen.getByRole('tab', { name: 'Two' }))
      .toHaveAttribute('aria-selected', 'true');
    await expect
      .element(screen.getByRole('tab', { name: 'One' }))
      .toHaveAttribute('aria-selected', 'false');
    await expect
      .element(screen.getByRole('tabpanel', { name: 'Two' }))
      .toHaveTextContent('Second panel');
    await expect.element(screen.getByText('First panel')).not.toBeVisible();
  });

  it('only has the selected tab in the tab order', async () => {
    const screen = await render(<Example defaultValue="two" />);

    await expect
      .element(screen.getByRole('tab', { name: 'Two' }))
      .toHaveAttribute('tabindex', '0');
    await expect
      .element(screen.getByRole('tab', { name: 'One' }))
      .toHaveAttribute('tabindex', '-1');
  });

  it('works controlled: reports a change and shows what value says', async () => {
    const onValueChange = vi.fn();
    const screen = await render(
      <Example value="one" onValueChange={onValueChange} />,
    );

    await screen.getByRole('tab', { name: 'Three' }).click();

    expect(onValueChange).toHaveBeenCalledWith('three');
    await expect
      .element(screen.getByRole('tab', { name: 'One' }))
      .toHaveAttribute('aria-selected', 'true');
  });

  it('follows a controlled value from the parent', async () => {
    const Controlled: React.FC = () => {
      const [value, setValue] = useState('one');

      return (
        <>
          <button type="button" onClick={() => setValue('three')}>
            Go to three
          </button>
          <Example value={value} onValueChange={setValue} />
        </>
      );
    };
    const screen = await render(<Controlled />);

    await screen.getByRole('button', { name: 'Go to three' }).click();
    await expect
      .element(screen.getByRole('tab', { name: 'Three' }))
      .toHaveAttribute('aria-selected', 'true');

    await screen.getByRole('tab', { name: 'Two' }).click();
    await expect
      .element(screen.getByRole('tab', { name: 'Two' }))
      .toHaveAttribute('aria-selected', 'true');
  });

  it('keeps inactive panels mounted so typed text survives a switch', async () => {
    const screen = await render(
      <Tabs defaultValue="a">
        <TabList aria-label="Drafts">
          <Tab value="a">A</Tab>
          <Tab value="b">B</Tab>
        </TabList>
        <TabPanel value="a">
          <input aria-label="Draft A" />
        </TabPanel>
        <TabPanel value="b">
          <input aria-label="Draft B" />
        </TabPanel>
      </Tabs>,
    );

    await userEvent.type(screen.getByLabelText('Draft A'), 'hello');
    await screen.getByRole('tab', { name: 'B' }).click();

    expect(
      screen.getByLabelText('Draft A', { exact: true }).element().isConnected,
    ).toBe(true);
    await expect.element(screen.getByLabelText('Draft A')).not.toBeVisible();

    await screen.getByRole('tab', { name: 'A' }).click();
    await expect.element(screen.getByLabelText('Draft A')).toHaveValue('hello');
  });

  it('keeps selection and ids correct when tabs come and go', async () => {
    const Dynamic: React.FC = () => {
      const [items, setItems] = useState(['a', 'b', 'c']);

      return (
        <>
          <button type="button" onClick={() => setItems(['a', 'c'])}>
            Remove b
          </button>
          <button type="button" onClick={() => setItems(['d', ...items])}>
            Add d
          </button>
          <Tabs defaultValue="c">
            <TabList aria-label="Dynamic">
              {items.map((item) => (
                <Tab key={item} value={item}>
                  Tab {item}
                </Tab>
              ))}
            </TabList>
            {items.map((item) => (
              <TabPanel key={item} value={item}>
                Panel {item}
              </TabPanel>
            ))}
          </Tabs>
        </>
      );
    };
    const screen = await render(<Dynamic />);

    await screen.getByRole('button', { name: 'Remove b' }).click();
    await expect
      .element(screen.getByRole('tab', { name: 'Tab b' }))
      .not.toBeInTheDocument();
    await expect
      .element(screen.getByRole('tab', { name: 'Tab c' }))
      .toHaveAttribute('aria-selected', 'true');

    await screen.getByRole('button', { name: 'Add d' }).click();
    await screen.getByRole('tab', { name: 'Tab d' }).click();

    const tab = screen.getByRole('tab', { name: 'Tab d' });
    const panel = screen.getByRole('tabpanel', { name: 'Tab d' });

    await expect.element(panel).toHaveTextContent('Panel d');
    await expect
      .element(tab)
      .toHaveAttribute('aria-controls', panel.element().id);
    await expect
      .element(panel)
      .toHaveAttribute('aria-labelledby', tab.element().id);
  });

  it('renders a wrapper element around each tab button', async () => {
    const screen = await render(<Example />);
    const button = screen.getByRole('tab', { name: 'One' }).element();
    const wrapper = button.parentElement;

    expect(wrapper).not.toBeNull();
    expect(wrapper).not.toBe(screen.getByRole('tablist').element());
    expect(wrapper?.parentElement).toBe(screen.getByRole('tablist').element());
    expect(button.tagName).toBe('BUTTON');
  });

  it('styles the selected tab and draws a static bar under it', async () => {
    const screen = await render(<Example />, { colorMode: 'light' });
    const selected = screen.getByRole('tab', { name: 'One' }).element();
    const other = screen.getByRole('tab', { name: 'Two' }).element();
    const bar = getComputedStyle(selected.parentElement as Element, '::after');
    const otherBar = getComputedStyle(
      other.parentElement as Element,
      '::after',
    );

    expect(getComputedStyle(selected).color).toBe(
      await resolve(vars.colorRole.text.default, 'light'),
    );
    expect(getComputedStyle(other).color).toBe(
      await resolve(vars.colorRole.text.muted, 'light'),
    );
    expect(bar.backgroundColor).toBe(
      await resolve(vars.colorRole.primary.solid, 'light'),
    );
    expect(bar.height).toBe('2px');
    expect(otherBar.content).not.toBe('""');
  });

  it('draws a baseline under the list', async () => {
    const screen = await render(<Example />, { colorMode: 'light' });

    expect(
      getComputedStyle(screen.getByRole('tablist').element()).boxShadow,
    ).toContain(await resolve(vars.colorRole.border.default, 'light'));
  });

  it('shows a focus ring on a keyboard-focused tab', async () => {
    const screen = await render(<Example />, { colorMode: 'light' });

    await userEvent.tab();

    const tab = screen.getByRole('tab', { name: 'One' }).element();

    expect(document.activeElement).toBe(tab);
    expect(getComputedStyle(tab).outlineStyle).toBe('solid');
  });

  it('works in both color modes', async () => {
    const screen = await render(<Example />, { colorMode: 'dark' });
    const selected = screen.getByRole('tab', { name: 'One' }).element();

    expect(getComputedStyle(selected).color).toBe(
      await resolve(vars.colorRole.text.default, 'dark'),
    );
  });

  it('matches the screenshot', async () => {
    await render(
      <div style={{ padding: 16, inlineSize: 400 }} data-testid="frame">
        <Example />
      </div>,
      { colorMode: 'light' },
    );

    await expect
      .element(page.getByTestId('frame'))
      .toMatchScreenshot('tabs-light');
  });

  describe('Slots', () => {
    it('renders startSlot before and endSlot after the tab, inside its wrapper', async () => {
      const screen = await render(<SlotExample />);
      const tab = screen.getByRole('tab', { name: 'One' }).element();
      const wrapper = tab.parentElement as HTMLElement;
      const dot = screen.getByTestId('dot-one').element();
      const close = screen.getByRole('button', { name: 'Close One' }).element();

      expect(wrapper.contains(dot)).toBe(true);
      expect(wrapper.contains(close)).toBe(true);
      expect(tab.contains(dot)).toBe(false);
      expect(tab.contains(close)).toBe(false);
      expect(
        dot.compareDocumentPosition(tab) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
      expect(
        tab.compareDocumentPosition(close) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    });

    it('keeps the tab name free of its Slot content', async () => {
      const screen = await render(<SlotExample />);

      await expect
        .element(screen.getByRole('tab', { name: 'One', exact: true }))
        .toBeVisible();
    });

    it('makes a close button its own focusable control outside the tab', async () => {
      const screen = await render(<SlotExample />);
      const close = screen.getByRole('button', { name: 'Close Two' });

      await expect.element(close).toBeVisible();
      expect(close.element().closest('[role="tab"]')).toBeNull();

      close.element().focus();
      expect(document.activeElement).toBe(close.element());
    });

    it("doesn't select the tab when a Slot control is clicked", async () => {
      const onClose = vi.fn();
      const screen = await render(<SlotExample onClose={onClose} />);

      await screen.getByRole('button', { name: 'Close Two' }).click();

      expect(onClose).toHaveBeenCalledOnce();
      await expect
        .element(screen.getByRole('tab', { name: 'One' }))
        .toHaveAttribute('aria-selected', 'true');
      await expect
        .element(screen.getByRole('tab', { name: 'Two' }))
        .toHaveAttribute('aria-selected', 'false');
    });

    it('lays out Slot content in line with the label', async () => {
      const screen = await render(<SlotExample />);
      const tab = screen.getByRole('tab', { name: 'One' }).element();
      const dot = screen.getByTestId('dot-one').element();
      const close = screen.getByRole('button', { name: 'Close One' }).element();
      const middle = (element: Element) => {
        const rect = element.getBoundingClientRect();

        return rect.top + rect.height / 2;
      };

      expect(middle(dot)).toBeCloseTo(middle(tab), 0);
      expect(middle(close)).toBeCloseTo(middle(tab), 0);
    });

    it('matches the screenshot of a tab with both Slots', async () => {
      await render(
        <div style={{ padding: 16, inlineSize: 400 }} data-testid="frame">
          <SlotExample />
        </div>,
        { colorMode: 'light' },
      );

      await expect
        .element(page.getByTestId('frame'))
        .toMatchScreenshot('tabs-slots-light');
    });
  });
});
