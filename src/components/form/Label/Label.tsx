import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { Atoms, atoms } from '../../../lib/css/atoms';
import { LabelTheme } from '../../../lib/theme/componentThemes';
import { classnames } from '../../../lib/utils/classnames';
import { HTMLElementProps } from '../../../lib/utils/utils';

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
  cursor?: Atoms['cursor'];
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
      className={classnames(containerClassName, className, atoms({ cursor }))}
      {...restProps}
    >
      {children}
    </Component>
  );
};
