import { getComponentStyles } from '../../../lib/theme/store/theme';
import { classnames } from '../../../lib/utils/classnames';
import type { HTMLElementProps } from '../../../lib/utils/utils';
import { Label } from '../Label';
import * as styles from './radio.css';

export type RadioProps = {
  children?: React.ReactNode;
  name: string;
  ref?: React.Ref<HTMLInputElement>;
  value: string;
} & HTMLElementProps<HTMLInputElement>;

export const Radio: React.FC<RadioProps> = ({
  name,
  children,
  className,
  ref,
  ...restProps
}) => {
  const containerClassName = getComponentStyles('radio', { base: true }, false);
  const iconClassName = getComponentStyles('radio', { icon: true }, false);
  const labelClassName = getComponentStyles('checkbox', { label: true }, false);

  const input = (
    <div
      className={classnames(styles.container, containerClassName, className)}
    >
      <input
        ref={ref}
        type="radio"
        name={name}
        className={styles.input}
        {...restProps}
      />
      <div className={classnames(styles.icon, iconClassName)} />
    </div>
  );

  if (!children) {
    return input;
  }

  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
    <label className={labelClassName}>
      {input}
      <Label asSpan>{children}</Label>
    </label>
  );
};
