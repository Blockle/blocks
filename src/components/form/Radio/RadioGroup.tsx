export type RadioGroupProps = {
  'aria-labelledby'?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
  style?: React.CSSProperties;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({ children, required, ...restProps }) => {
  return (
    <div role="radiogroup" aria-required={required} {...restProps}>
      {children}
    </div>
  );
};
