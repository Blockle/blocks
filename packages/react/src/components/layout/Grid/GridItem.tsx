import {
  classnames,
  getResponsiveStyle,
  type HTMLElementProps,
  type ResponsiveValue,
} from '@blockle/blocks-core';
import { createSlottable } from '@blockle/blocks-react-slot';

import * as styles from './Grid.css.js';

export type GridItemProps = {
  asChild?: boolean;
  colSpan: ResponsiveValue<keyof typeof styles.responsiveColSpanStyles>;
  ref?: React.Ref<HTMLDivElement>;
  rowSpan?: ResponsiveValue<keyof typeof styles.responsiveRowSpanStyles>;
} & Omit<HTMLElementProps<HTMLDivElement>, 'colSpan' | 'rowSpan'>;

const [Template, Slot] = createSlottable('div');

export const GridItem: React.FC<GridItemProps> = ({
  children,
  className,
  colSpan,
  rowSpan,
  asChild,
  ref,
}) => {
  const colSpanClass = getResponsiveStyle(
    styles.responsiveColSpanStyles,
    colSpan,
  );
  const rowSpanClass = getResponsiveStyle(
    styles.responsiveRowSpanStyles,
    rowSpan,
  );

  return (
    <Template
      ref={ref}
      asChild={asChild}
      className={classnames(colSpanClass, rowSpanClass, className)}
    >
      <Slot>{children}</Slot>
    </Template>
  );
};
