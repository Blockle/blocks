type SlotProps = {
  children?: React.ReactNode;
};

/**
 * Indicates a placeholder for slottable content.
 */
export const Slot: React.FC<SlotProps> = ({ children }) => {
  return children;
};
