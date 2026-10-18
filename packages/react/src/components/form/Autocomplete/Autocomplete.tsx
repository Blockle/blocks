export type AutocompleteProps = {
  ref?: React.Ref<HTMLElement>;
  options: string[];
  placeholder?: string;
};

export const Autocomplete: React.FC<AutocompleteProps> = ({
  ref,
  options,
  placeholder = 'Select an option',
}) => {
  return null;
};
