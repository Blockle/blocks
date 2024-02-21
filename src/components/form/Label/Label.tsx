import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { Atoms, atoms } from '../../../lib/css/atoms';
import { LabelTheme } from '../../../lib/theme/componentThemes';
import { classnames } from '../../../lib/utils/classnames';
import { HTMLElementProps } from '../../../lib/utils/utils';

export type LabelProps = {
  visualOnly?: boolean;
  htmlFor?: string;
  children?: React.ReactNode;
  required?: boolean;
  size?: LabelTheme['variants']['size'];
  cursor?: Atoms['cursor'];
} & HTMLElementProps<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = ({
  visualOnly,
  children,
  className,
  required,
  size,
  cursor,
  ...restProps
}) => {
  const Component = visualOnly ? 'span' : 'label';
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
