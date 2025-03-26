import {
  type ComponentThemes,
  type HTMLElementProps,
  type Sprinkles,
  classnames,
  sprinkles,
} from '@blockle/blocks-core';
import { useComponentStyles } from '../../../hooks/useComponentStyles';

type LabelTheme = ComponentThemes['label'];

export type LabelProps = {
  /**
   * If true, the label will be rendered as a span element
   * but will still have the same styles as a label.
   * Useful for when you want to use a label element but
   * can't because of the parent element's structure.
   */
  asSpan?: boolean;
  htmlFor?: string;
  children?: React.ReactNode;
  required?: boolean;
  size?: LabelTheme['variants']['size'];
  cursor?: Sprinkles['cursor'];
} & HTMLElementProps<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = ({
  asSpan,
  children,
  className,
  required,
  size,
  cursor,
  ...restProps
}) => {
  const Component = asSpan ? 'span' : 'label';
  const containerClassName = useComponentStyles('label', {
    base: true,
    variants: { required, size },
  });

  return (
    <Component
      className={classnames(
        containerClassName,
        className,
        sprinkles({ cursor }),
      )}
      {...restProps}
    >
      {children}
    </Component>
  );
};
