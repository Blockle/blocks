import { Atoms } from '../../lib/css/atoms';
import { Stack } from '../Stack';

export type RadioGroupProps = {
  'aria-labelledby'?: string;
  children: React.ReactNode;
  gap?: Atoms['gap'];
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  gap = 'medium',
  ...restProps
}) => {
  return (
    <Stack as="div" role="radiogroup" gap={gap} {...restProps}>
      {children}
    </Stack>
  );
};
