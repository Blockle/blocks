import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { createVar, globalStyle, style } from '@vanilla-extract/css';

type IntentRoles = (typeof vars.colorRole)['primary'];

const paddingBlock = createVar();
const paddingInline = createVar();

// Each filled Slot is one line tall, so its content can't make the Tag taller
const slot = style([
  atoms({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  {
    blockSize: '1lh',
    flexShrink: 0,
  },
]);

const startSlot = style([slot]);
const endSlot = style([slot]);

const root = style([
  atoms({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    borderRadius: 'full',
    fontWeight: 'medium',
    lineHeight: 'normal',
  }),
  {
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    paddingBlock,
    paddingInline,
    selectors: {
      // A Slot sits as close to the rounded edge as to the top and bottom
      [`&:has(> ${startSlot})`]: {
        paddingInlineStart: paddingBlock,
      },
      [`&:has(> ${endSlot})`]: {
        paddingInlineEnd: paddingBlock,
      },
    },
  },
]);

// Overrides the size a Slot's content sets itself, such as an IconButton's
// height or an Icon's width
globalStyle(`${root} > ${slot} > *`, {
  blockSize: '100%',
  inlineSize: 'auto',
  maxBlockSize: '100%',
});

globalStyle(`${root} > ${slot} > * > svg`, {
  blockSize: '75%',
  inlineSize: '75%',
});

const intentStyle = (roles: IntentRoles) =>
  style({
    backgroundColor: roles.subtle,
    color: roles.foreground,
  });

export const tag: ThemeComponentsStyles['tag'] = makeComponentTheme('tag', {
  root,
  startSlot,
  endSlot,
  variants: {
    intent: {
      primary: intentStyle(vars.colorRole.primary),
      secondary: intentStyle(vars.colorRole.secondary),
      neutral: intentStyle(vars.colorRole.neutral),
      danger: intentStyle(vars.colorRole.danger),
      success: intentStyle(vars.colorRole.success),
      info: intentStyle(vars.colorRole.info),
      warning: intentStyle(vars.colorRole.warning),
    },
    size: {
      small: style([
        atoms({ fontSize: 'xsmall' }),
        { vars: { [paddingBlock]: '2px', [paddingInline]: vars.space[2] } },
      ]),
      medium: style([
        atoms({ fontSize: 'small' }),
        { vars: { [paddingBlock]: '2px', [paddingInline]: vars.space[2] } },
      ]),
      large: style([
        atoms({ fontSize: 'medium' }),
        {
          vars: {
            [paddingBlock]: vars.space[1],
            [paddingInline]: vars.space[3],
          },
        },
      ]),
    },
  },
  defaultVariants: {
    intent: 'neutral',
    size: 'small',
  },
});
