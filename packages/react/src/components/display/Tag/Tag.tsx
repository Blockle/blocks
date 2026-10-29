'use client';

import {
  type ComponentThemes,
  classnames,
  type HTMLElementProps,
} from '@blockle/blocks-core';
import { createSlottable } from '@blockle/blocks-react-slot';
import type React from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';

type TagTheme = ComponentThemes['tag'];

export type TagProps = {
  /**
   * Render the single child element instead of a `span`, with the Tag's
   * classes and attributes merged onto it
   */
  asChild?: boolean;
  children: React.ReactNode;
  /**
   * Content placed after the text, such as an `IconButton` that removes the
   * Tag. It is sized to the Tag's line height, so it doesn't make the Tag
   * taller.
   */
  endSlot?: React.ReactNode;
  intent?: TagTheme['variants']['intent'];
  ref?: React.Ref<HTMLSpanElement>;
  size?: TagTheme['variants']['size'];
  /**
   * Content placed before the text, such as an `Icon`, an avatar `img` or an
   * emoji. It is sized to the Tag's line height.
   */
  startSlot?: React.ReactNode;
} & Omit<HTMLElementProps<HTMLSpanElement>, 'children' | 'ref' | 'size'>;

const [Template, Slot] = createSlottable('span');

function hasContent(node: React.ReactNode) {
  return node !== undefined && node !== null && node !== false && node !== '';
}

export const Tag: React.FC<TagProps> = ({
  asChild,
  children,
  className,
  endSlot,
  intent,
  size,
  startSlot,
  ...restProps
}) => {
  const tagClassName = useComponentStyles('tag', {
    root: true,
    variants: { intent, size },
  });
  const startSlotClassName = useComponentStyles(
    'tag',
    { startSlot: true },
    false,
  );
  const endSlotClassName = useComponentStyles('tag', { endSlot: true }, false);

  return (
    <Template
      asChild={asChild}
      className={classnames(tagClassName, className)}
      {...restProps}
    >
      {hasContent(startSlot) && (
        <span className={startSlotClassName}>{startSlot}</span>
      )}
      <Slot>{children}</Slot>
      {hasContent(endSlot) && (
        <span className={endSlotClassName}>{endSlot}</span>
      )}
    </Template>
  );
};
