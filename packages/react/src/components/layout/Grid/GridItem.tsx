import { createSlottable } from '@blockle/blocks-react-slot';

export type GridItemProps = {
  children?: React.ReactNode;
  className?: string;
  colSpan: number; // TODO Should be response array too
  rowSpan?: number;
  asChild?: boolean;
  ref?: React.Ref<HTMLDivElement>;
};

const [Template, Slot] = createSlottable('div');

export const GridItem: React.FC<GridItemProps> = ({
  children,
  className,
  colSpan,
  rowSpan,
  asChild,
  ref,
}) => {
  return (
    <Template
      ref={ref}
      asChild={asChild}
      className={className}
      style={{
        gridColumn: `span ${colSpan} / span ${colSpan}`,
        gridRow: rowSpan ? `span ${rowSpan} / span ${rowSpan}` : undefined,
      }}
    >
      <Slot>{children}</Slot>
    </Template>
  );
};
