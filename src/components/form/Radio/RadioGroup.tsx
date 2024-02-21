export type RadioGroupProps = {
  'aria-labelledby'?: string;
  children: React.ReactNode;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({ children, ...restProps }) => {
  return (
    <div role="radiogroup" {...restProps}>
      {children}
    </div>
  );
};
