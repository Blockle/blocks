import { vars } from '@blockle/blocks-core';
import { momotaro } from '@blockle/blocks-theme-momotaro';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';

import { resolve } from '../../../testUtils/browser/contrast.js';
import { render } from '../../../testUtils/browser/render.js';
import { itScreenshot } from '../../../testUtils/browser/screenshot.js';
import { Tab } from './Tab.js';
import { TabList } from './TabList.js';
import { TabPanel } from './TabPanel.js';
import { Tabs } from './Tabs.js';
import {
  describeTabsMechanics,
  Example,
  SlotExample,
} from './Tabs.mechanics.suite.js';

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

  it('styles the selected tab in the stronger text color', async () => {
    const screen = await render(<Example />, { colorMode: 'light' });
    const selected = screen.getByRole('tab', { name: 'One' }).element();
    const other = screen.getByRole('tab', { name: 'Two' }).element();

    expect(getComputedStyle(selected).color).toBe(
      await resolve(vars.colorRole.text.default, 'light'),
    );
    expect(getComputedStyle(other).color).toBe(
      await resolve(vars.colorRole.text.muted, 'light'),
    );
  });

  describeTabsMechanics({
    theme: momotaro,
    indicator: { color: vars.colorRole.primary.solid, thickness: '2px' },
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

  describe('keyboard', () => {
    it('moves to and selects the next and previous tab with the arrow keys, wrapping', async () => {
      const screen = await render(<Example />);

      screen.getByRole('tab', { name: 'One' }).element().focus();

      await userEvent.keyboard('{ArrowRight}');
      await expect
        .element(screen.getByRole('tab', { name: 'Two' }))
        .toHaveFocus();
      await expect
        .element(screen.getByRole('tab', { name: 'Two' }))
        .toHaveAttribute('aria-selected', 'true');

      await userEvent.keyboard('{ArrowRight}{ArrowRight}');
      await expect
        .element(screen.getByRole('tab', { name: 'One' }))
        .toHaveFocus();
      await expect
        .element(screen.getByRole('tab', { name: 'One' }))
        .toHaveAttribute('aria-selected', 'true');

      await userEvent.keyboard('{ArrowLeft}');
      await expect
        .element(screen.getByRole('tab', { name: 'Three' }))
        .toHaveFocus();
      await expect
        .element(screen.getByRole('tab', { name: 'Three' }))
        .toHaveAttribute('aria-selected', 'true');
      await expect
        .element(screen.getByRole('tabpanel', { name: 'Three' }))
        .toHaveTextContent('Third panel');
    });

    it('selects and focuses the first and last tab with Home and End', async () => {
      const screen = await render(<Example defaultValue="two" />);

      screen.getByRole('tab', { name: 'Two' }).element().focus();

      await userEvent.keyboard('{End}');
      await expect
        .element(screen.getByRole('tab', { name: 'Three' }))
        .toHaveFocus();
      await expect
        .element(screen.getByRole('tab', { name: 'Three' }))
        .toHaveAttribute('aria-selected', 'true');

      await userEvent.keyboard('{Home}');
      await expect
        .element(screen.getByRole('tab', { name: 'One' }))
        .toHaveFocus();
      await expect
        .element(screen.getByRole('tab', { name: 'One' }))
        .toHaveAttribute('aria-selected', 'true');
    });

    it('makes the tab list a single stop in the tab order', async () => {
      const screen = await render(
        <>
          <Example defaultValue="two" />
          <button type="button">After</button>
        </>,
      );

      await userEvent.tab();
      await expect
        .element(screen.getByRole('tab', { name: 'Two' }))
        .toHaveFocus();

      await userEvent.tab();
      await expect
        .element(screen.getByRole('tabpanel', { name: 'Two' }))
        .toHaveFocus();

      await userEvent.tab();
      await expect
        .element(screen.getByRole('button', { name: 'After' }))
        .toHaveFocus();
    });

    it('keeps arrow keys working after tabs are added and removed', async () => {
      const Dynamic: React.FC = () => {
        const [items, setItems] = useState(['a', 'b', 'c']);

        return (
          <>
            <button type="button" onClick={() => setItems(['a', 'c', 'd'])}>
              Change
            </button>
            <Tabs defaultValue="a">
              <TabList aria-label="Dynamic">
                {items.map((item) => (
                  <Tab key={item} value={item}>
                    Tab {item}
                  </Tab>
                ))}
              </TabList>
            </Tabs>
          </>
        );
      };
      const screen = await render(<Dynamic />);

      await screen.getByRole('button', { name: 'Change' }).click();
      screen.getByRole('tab', { name: 'Tab a' }).element().focus();

      await userEvent.keyboard('{ArrowRight}');
      await expect
        .element(screen.getByRole('tab', { name: 'Tab c' }))
        .toHaveFocus();

      await userEvent.keyboard('{ArrowRight}');
      await expect
        .element(screen.getByRole('tab', { name: 'Tab d' }))
        .toHaveFocus();

      await userEvent.keyboard('{ArrowRight}');
      await expect
        .element(screen.getByRole('tab', { name: 'Tab a' }))
        .toHaveFocus();
    });

    it('reports keyboard selection through onValueChange when controlled', async () => {
      const onValueChange = vi.fn();
      const screen = await render(
        <Example value="one" onValueChange={onValueChange} />,
      );

      screen.getByRole('tab', { name: 'One' }).element().focus();
      await userEvent.keyboard('{ArrowRight}');

      expect(onValueChange).toHaveBeenCalledWith('two');
    });
  });

  itScreenshot('matches the screenshot', async () => {
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

    itScreenshot(
      'matches the screenshot of a tab with both Slots',
      async () => {
        await render(
          <div style={{ padding: 16, inlineSize: 400 }} data-testid="frame">
            <SlotExample />
          </div>,
          { colorMode: 'light' },
        );

        await expect
          .element(page.getByTestId('frame'))
          .toMatchScreenshot('tabs-slots-light');
      },
    );
  });

  describe('Review fixes', () => {
    it('keeps the list one tab stop when no tab matches the value', async () => {
      const screen = await render(
        <Tabs>
          <TabList aria-label="Sections">
            <Tab value="one">One</Tab>
            <Tab value="two">Two</Tab>
          </TabList>
        </Tabs>,
      );

      const tabs = screen.getByRole('tab').elements();

      expect(tabs.map((tab) => tab.tabIndex)).toEqual([0, -1]);
      expect(tabs.map((tab) => tab.getAttribute('aria-selected'))).toEqual([
        'false',
        'false',
      ]);
    });

    it('keeps the list one tab stop when the selected tab is removed', async () => {
      const screen = await render(
        <Tabs value="gone">
          <TabList aria-label="Sections">
            <Tab value="one">One</Tab>
            <Tab value="two">Two</Tab>
          </TabList>
        </Tabs>,
      );

      expect(
        screen
          .getByRole('tab')
          .elements()
          .map((tab) => tab.tabIndex),
      ).toEqual([0, -1]);
    });

    it('ignores arrow keys pressed with a modifier key', async () => {
      const onValueChange = vi.fn();
      const screen = await render(
        <Example value="one" onValueChange={onValueChange} />,
      );

      screen.getByRole('tab', { name: 'One' }).element().focus();
      await userEvent.keyboard('{Alt>}{ArrowRight}{/Alt}');
      await userEvent.keyboard('{Control>}{End}{/Control}');
      await userEvent.keyboard('{Meta>}{ArrowLeft}{/Meta}');

      expect(onValueChange).not.toHaveBeenCalled();
    });

    it('does not let rest props override the managed attributes', async () => {
      const screen = await render(
        <Tabs defaultValue="one">
          <TabList aria-label="Sections">
            <Tab
              value="one"
              {...({
                role: 'link',
                id: 'mine',
                tabIndex: 5,
                'aria-selected': false,
                'aria-controls': 'other',
              } as object)}
            >
              One
            </Tab>
          </TabList>
        </Tabs>,
      );

      const tab = screen.getByRole('tab', { name: 'One' }).element();

      expect(tab.id).not.toBe('mine');
      expect(tab.tabIndex).toBe(0);
      expect(tab.getAttribute('aria-selected')).toBe('true');
      expect(tab.getAttribute('aria-controls')).not.toBe('other');
    });

    it('still runs a consumer onClick and onKeyDown', async () => {
      const onClick = vi.fn();
      const onKeyDown = vi.fn();
      const screen = await render(
        <Tabs defaultValue="one">
          <TabList aria-label="Sections">
            <Tab value="one" onClick={onClick} onKeyDown={onKeyDown}>
              One
            </Tab>
          </TabList>
        </Tabs>,
      );

      const tab = screen.getByRole('tab', { name: 'One' });

      await tab.click();
      await userEvent.keyboard('a');

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onKeyDown).toHaveBeenCalledTimes(1);
    });

    it('does not clip the focus ring of an IconButton in an endSlot', async () => {
      const screen = await render(
        <div style={{ padding: 16, inlineSize: 400 }}>
          <SlotExample />
        </div>,
      );
      const list = screen.getByRole('tablist').element();
      const close = screen.getByRole('button', { name: 'Close One' });

      await userEvent.tab();
      await userEvent.tab();
      close.element().focus();

      const listBox = list.getBoundingClientRect();
      const button = close.element().getBoundingClientRect();
      const offset = Number.parseFloat(
        getComputedStyle(close.element()).outlineOffset,
      );
      const width = Number.parseFloat(
        getComputedStyle(close.element()).outlineWidth,
      );
      // How far the ring reaches beyond the button
      const ring = Math.max(0, offset + width);

      expect(button.top - ring).toBeGreaterThanOrEqual(listBox.top);
      expect(button.bottom + ring).toBeLessThanOrEqual(listBox.bottom);
    });
  });
});
