import type { Theme } from '@blockle/blocks-core';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { cdp, userEvent } from 'vitest/browser';

import { resolve } from '../../../testUtils/browser/contrast.js';
import { emulateNoAnchorPositioning } from '../../../testUtils/browser/emulateNoAnchorPositioning.js';
import { render } from '../../../testUtils/browser/render.js';
import { IconButton } from '../../form/IconButton/IconButton.js';
import { Tab } from './Tab.js';
import { TabList } from './TabList.js';
import { TabNav } from './TabNav.js';
import { TabPanel } from './TabPanel.js';
import { Tabs, type TabsProps } from './Tabs.js';

// The Tab mechanics every theme gets from Blocks' base styles: the Tab
// indicator, overflow scrolling, the static fallback bar and inset focus
// rings. Run under momotaro (Tabs.browser.test.tsx) and under the bare
// testTheme (Tabs.base.browser.test.tsx), each in its own file because a
// theme's Color roles are global to the page.

export const Example: React.FC<Partial<TabsProps>> = (props) => (
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

export const SlotExample: React.FC<{ onClose?: () => void }> = ({
  onClose,
}) => (
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

export type TabsMechanicsOptions = {
  theme: Theme;
  /** The Tab indicator's look the theme sets */
  indicator: { color: string; thickness: string };
};

export function describeTabsMechanics({
  theme,
  indicator: look,
}: TabsMechanicsOptions) {
  describe('Tab indicator', () => {
    const getIndicator = (list: Element) =>
      list.querySelector('[data-tab-indicator]') as HTMLElement;

    const getBox = (element: Element) => {
      const { left, width } = element.getBoundingClientRect();

      return `${Math.round(left)},${Math.round(width)}`;
    };

    // The indicator's box and the selected tab's wrapper share left and width
    const expectAligned = (list: Element, tab: Element) =>
      expect
        .poll(() => getBox(getIndicator(list)))
        .toBe(getBox(tab.parentElement as Element));

    it('is one primary bar under the selected tab', async () => {
      const screen = await render(<Example />, { colorMode: 'light', theme });
      const list = screen.getByRole('tablist').element();
      const indicator = getIndicator(list);
      const tab = screen.getByRole('tab', { name: 'One' }).element();

      expect(list.querySelectorAll('[data-tab-indicator]')).toHaveLength(1);
      expect(indicator.getAttribute('aria-hidden')).toBe('true');
      expect(getComputedStyle(indicator).backgroundColor).toBe(
        await resolve(look.color, 'light', theme),
      );
      expect(getComputedStyle(indicator).height).toBe(look.thickness);
      expect(
        getComputedStyle(tab.parentElement as Element, '::after').content,
      ).not.toBe('""');
    });

    it('lines up with the selected tab after a selection change', async () => {
      const screen = await render(<Example />, { theme });
      const list = screen.getByRole('tablist').element();

      await expectAligned(
        list,
        screen.getByRole('tab', { name: 'One' }).element(),
      );

      await userEvent.click(screen.getByRole('tab', { name: 'Three' }));
      await expectAligned(
        list,
        screen.getByRole('tab', { name: 'Three' }).element(),
      );

      await userEvent.click(screen.getByRole('tab', { name: 'Two' }));
      await expectAligned(
        list,
        screen.getByRole('tab', { name: 'Two' }).element(),
      );
    });

    it('lines up after the tab list is resized', async () => {
      const Resizable: React.FC<{ width: number }> = ({ width }) => (
        <div
          style={{
            inlineSize: width,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Example />
        </div>
      );
      const screen = await render(<Resizable width={600} />, { theme });
      const list = screen.getByRole('tablist').element();
      const tab = screen.getByRole('tab', { name: 'Two' });

      await userEvent.click(tab);
      await expectAligned(list, tab.element());

      await screen.rerender(<Resizable width={300} />);
      await expectAligned(list, tab.element());
    });

    it('lines up after the selected tab label changes', async () => {
      const Labelled: React.FC<{ label: string }> = ({ label }) => (
        <Tabs defaultValue="one">
          <TabList aria-label="Sections">
            <Tab value="one">{label}</Tab>
            <Tab value="two">Two</Tab>
          </TabList>
        </Tabs>
      );
      const screen = await render(<Labelled label="One" />, { theme });
      const list = screen.getByRole('tablist').element();
      const before = getIndicator(list).getBoundingClientRect().width;

      await screen.rerender(<Labelled label="A much longer label" />);
      await expectAligned(
        list,
        screen.getByRole('tab', { name: 'A much longer label' }).element(),
      );
      expect(getIndicator(list).getBoundingClientRect().width).toBeGreaterThan(
        before,
      );
    });

    it('slides rather than jumping when the selection changes', async () => {
      const screen = await render(<Example />, { theme });
      const list = screen.getByRole('tablist').element();
      const three = screen.getByRole('tab', { name: 'Three' });

      await userEvent.click(three);

      const wrapperLeft = (
        three.element().parentElement as Element
      ).getBoundingClientRect().left;

      // Mid-flight, the indicator hasn't reached the new tab yet
      expect(getIndicator(list).getBoundingClientRect().left).toBeLessThan(
        wrapperLeft - 1,
      );
      await expectAligned(list, three.element());
    });

    it('anchors each list to its own selected tab', async () => {
      const screen = await render(
        <>
          <Example />
          <Example defaultValue="three" />
        </>,
        { theme },
      );
      const lists = screen.getByRole('tablist').elements();

      expect(lists).toHaveLength(2);
      await expectAligned(
        lists[0] as Element,
        lists[0]?.querySelector('[aria-selected="true"]') as HTMLElement,
      );
      await expectAligned(
        lists[1] as Element,
        lists[1]?.querySelector('[aria-selected="true"]') as HTMLElement,
      );
    });

    it('animates its position and width', async () => {
      const screen = await render(<Example />, { theme });
      const style = getComputedStyle(
        getIndicator(screen.getByRole('tablist').element()),
      );

      expect(style.transitionProperty).toContain('left');
      expect(style.transitionProperty).toContain('width');
      expect(Number.parseFloat(style.transitionDuration)).toBeGreaterThan(0);
    });

    it('does not animate under prefers-reduced-motion: reduce', async () => {
      await cdp().send('Emulation.setEmulatedMedia', {
        features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
      });

      try {
        const screen = await render(<Example />, { theme });
        const style = getComputedStyle(
          getIndicator(screen.getByRole('tablist').element()),
        );

        expect(Number.parseFloat(style.transitionDuration)).toBe(0);
      } finally {
        await cdp().send('Emulation.setEmulatedMedia', {
          features: [
            { name: 'prefers-reduced-motion', value: 'no-preference' },
          ],
        });
      }
    });

    it('is not drawn when no tab is selected', async () => {
      const screen = await render(
        <Tabs>
          <TabList aria-label="Sections">
            <Tab value="one">One</Tab>
          </TabList>
        </Tabs>,
        { theme },
      );

      expect(
        getComputedStyle(getIndicator(screen.getByRole('tablist').element()))
          .display,
      ).toBe('none');
    });
  });

  describe('overflow', () => {
    const labels = Array.from({ length: 20 }, (_, i) => `Section ${i + 1}`);

    const Many: React.FC<Partial<TabsProps>> = (props) => (
      <div style={{ width: 300 }}>
        <Tabs defaultValue={labels[0]} {...props}>
          <TabList aria-label="Sections">
            {labels.map((label) => (
              <Tab key={label} value={label}>
                {label}
              </Tab>
            ))}
          </TabList>
          {labels.map((label) => (
            <TabPanel key={label} value={label}>
              {label} panel
            </TabPanel>
          ))}
        </Tabs>
      </div>
    );

    const getIndicator = (list: Element) =>
      list.querySelector('[data-tab-indicator]') as HTMLElement;

    it('scrolls sideways on one row without wrapping', async () => {
      const screen = await render(<Many />, { theme });
      const list = screen.getByRole('tablist').element();
      const first = screen
        .getByRole('tab', { name: 'Section 1', exact: true })
        .element();
      const last = screen
        .getByRole('tab', { name: 'Section 20', exact: true })
        .element();

      expect(getComputedStyle(list).overflowX).toBe('auto');
      expect(list.scrollWidth).toBeGreaterThan(list.clientWidth);
      expect(last.getBoundingClientRect().top).toBe(
        first.getBoundingClientRect().top,
      );
    });

    it('scrolls a tab selected from outside into view', async () => {
      const Controlled: React.FC = () => {
        const [value, setValue] = useState('Section 1');

        return (
          <>
            <button type="button" onClick={() => setValue('Section 20')}>
              Jump
            </button>
            <Many value={value} onValueChange={setValue} />
          </>
        );
      };
      const screen = await render(<Controlled />, { theme });
      const list = screen.getByRole('tablist').element();

      expect(list.scrollLeft).toBe(0);
      await userEvent.click(
        screen.getByRole('button', { name: 'Jump', exact: true }),
      );

      await expect
        .poll(() => {
          const tab = screen
            .getByRole('tab', { name: 'Section 20', exact: true })
            .element()
            .getBoundingClientRect();
          const box = list.getBoundingClientRect();

          return tab.left >= box.left - 1 && tab.right <= box.right + 1;
        })
        .toBe(true);
    });

    it('scrolls a tab selected by keyboard into view', async () => {
      const screen = await render(<Many />, { theme });
      const list = screen.getByRole('tablist').element();

      screen
        .getByRole('tab', { name: 'Section 1', exact: true })
        .element()
        .focus();
      await userEvent.keyboard('{End}');

      await expect.poll(() => list.scrollLeft).toBeGreaterThan(0);
    });

    it('does not scroll the page vertically', async () => {
      const screen = await render(
        <>
          <div style={{ height: 2000 }} />
          <Many defaultValue="Section 20" />
          <div style={{ height: 2000 }} />
        </>,
        { theme },
      );
      const list = screen.getByRole('tablist').element();

      await expect.poll(() => list.scrollLeft).toBeGreaterThan(0);
      expect(window.scrollY).toBe(0);
    });

    it('keeps the Tab indicator under the selected tab while scrolling', async () => {
      const screen = await render(<Many />, { theme });
      const list = screen.getByRole('tablist').element();
      const wrapper = screen
        .getByRole('tab', { name: 'Section 1', exact: true })
        .element().parentElement as Element;

      const box = (element: Element) => {
        const { left, width } = element.getBoundingClientRect();

        return `${Math.round(left)},${Math.round(width)}`;
      };

      list.scrollLeft = 80;

      await expect.poll(() => box(getIndicator(list))).toBe(box(wrapper));
      expect(list.scrollLeft).toBe(80);
    });

    // The list clips anything outside it, so focus rings are drawn inside
    it('draws the focus rings of a tab and its Slot control inside the list', async () => {
      const screen = await render(<SlotExample />, { theme });
      const tab = screen.getByRole('tab', { name: 'One' }).element();
      const close = screen.getByRole('button', { name: 'Close One' }).element();

      await userEvent.tab();
      expect(document.activeElement).toBe(tab);
      expect(
        Number.parseFloat(getComputedStyle(tab).outlineOffset),
      ).toBeLessThan(0);

      // Focused after a key press, so the browser shows its ring
      close.focus();
      expect(document.activeElement).toBe(close);
      expect(
        Number.parseFloat(getComputedStyle(close).outlineOffset),
      ).toBeLessThan(0);
    });
  });

  describe('without anchor positioning', () => {
    it('hides the Tab indicator and draws a static bar under the selected tab', async () => {
      const screen = await render(<Example />, { colorMode: 'light', theme });
      const color = await resolve(look.color, 'light', theme);
      const list = screen.getByRole('tablist').element();
      const selected = screen.getByRole('tab', { name: 'One' }).element()
        .parentElement as Element;
      const other = screen.getByRole('tab', { name: 'Two' }).element()
        .parentElement as Element;
      const restore = emulateNoAnchorPositioning();

      try {
        const bar = getComputedStyle(selected, '::after');

        expect(
          getComputedStyle(
            list.querySelector('[data-tab-indicator]') as Element,
          ).display,
        ).toBe('none');
        expect(bar.content).toBe('""');
        expect(bar.position).toBe('absolute');
        expect(bar.bottom).toBe('0px');
        expect(bar.height).toBe(look.thickness);
        expect(bar.width).toBe(getComputedStyle(selected).width);
        expect(bar.backgroundColor).toBe(color);
        expect(getComputedStyle(other, '::after').content).toBe('none');
      } finally {
        restore();
      }
    });

    it('moves the static bar with the selection', async () => {
      const screen = await render(<Example />, { theme });
      const restore = emulateNoAnchorPositioning();

      try {
        await userEvent.click(screen.getByRole('tab', { name: 'Three' }));

        const wrapperOf = (name: string) =>
          screen.getByRole('tab', { name }).element().parentElement as Element;

        expect(getComputedStyle(wrapperOf('Three'), '::after').content).toBe(
          '""',
        );
        expect(getComputedStyle(wrapperOf('One'), '::after').content).toBe(
          'none',
        );
      } finally {
        restore();
      }
    });
  });

  describe('TabNav', () => {
    const Nav: React.FC<{ width?: number }> = ({ width }) => (
      <div style={{ width }}>
        <TabNav aria-label="Pages">
          {Array.from({ length: 20 }, (_, i) => `Page ${i + 1}`).map(
            (label) => (
              <Tab key={label} href={`#${label}`} current={label === 'Page 3'}>
                {label}
              </Tab>
            ),
          )}
        </TabNav>
      </div>
    );

    const wrapperOf = (name: string) =>
      document.querySelector(`a[href="#${name}"]`)?.parentElement as Element;

    it('lines the Tab indicator up with the current tab', async () => {
      const screen = await render(<Nav />, { theme });
      const indicator = screen
        .getByRole('navigation')
        .element()
        .querySelector('[data-tab-indicator]') as HTMLElement;
      const tabBox = wrapperOf('Page 3').getBoundingClientRect();
      const barBox = indicator.getBoundingClientRect();

      expect(barBox.left).toBeCloseTo(tabBox.left, 0);
      expect(barBox.width).toBeCloseTo(tabBox.width, 0);
      expect(getComputedStyle(indicator).height).toBe(look.thickness);
    });

    it('scrolls sideways on one row when the links overflow', async () => {
      const screen = await render(<Nav width={300} />, { theme });
      const nav = screen.getByRole('navigation').element();

      expect(getComputedStyle(nav).overflowX).toBe('auto');
      expect(nav.scrollWidth).toBeGreaterThan(nav.clientWidth);
      expect(wrapperOf('Page 20').getBoundingClientRect().top).toBe(
        wrapperOf('Page 1').getBoundingClientRect().top,
      );
    });

    it('draws the focus ring inside the scrolling nav', async () => {
      const screen = await render(<Nav />, { theme });

      await userEvent.tab();

      const link = screen
        .getByRole('link', { name: 'Page 1', exact: true })
        .element();

      expect(document.activeElement).toBe(link);
      expect(
        Number.parseFloat(getComputedStyle(link).outlineOffset),
      ).toBeLessThan(0);
    });

    it('draws a static bar under the current tab without anchor positioning', async () => {
      await render(<Nav />, { colorMode: 'light', theme });

      const color = await resolve(look.color, 'light', theme);
      const restore = emulateNoAnchorPositioning();

      try {
        const bar = getComputedStyle(wrapperOf('Page 3'), '::after');

        expect(bar.content).toBe('""');
        expect(bar.height).toBe(look.thickness);
        expect(bar.backgroundColor).toBe(color);
        expect(getComputedStyle(wrapperOf('Page 1'), '::after').content).toBe(
          'none',
        );
      } finally {
        restore();
      }
    });
  });
}
