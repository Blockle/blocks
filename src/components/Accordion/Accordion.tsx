import { useId } from 'react';

export type AccordionProps = {};

export const Accordion: React.FC<AccordionProps> = ({}) => {
  return <div>Accordion</div>;
};

export type AccordionItemProps = {
  children: React.ReactNode;
};

export const AccordionItem: React.FC<AccordionHeaderProps> = ({ children }) => {
  // TODO Pass this id to the header and body with context?
  const id = useId();

  return <div>{children}</div>;
};

export type AccordionHeaderProps = {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

export const AccordionHeader: React.FC<AccordionHeaderProps> = ({ children, level = 3 }) => {
  const Component = `h${level}` as const;

  return (
    <Component>
      <button id={'$id-header'} type="button" aria-expanded="true" aria-controls={'$id-body'}>
        {children}
      </button>
    </Component>
  );
};

export type AccordionBodyProps = {
  children: React.ReactNode;
};

export const AccordionBody: React.FC<AccordionHeaderProps> = ({ children }) => {
  return (
    <div
      id={'$id-body'}
      role="region"
      aria-labelledby={'$id-header'}
      // @ts-expect-error inert property is not in the HTMLAttributes interface, remove this line when it is
      inert={''}
      hidden // Add this prop when animations are finished
    >
      {children}
    </div>
  );
};

/*
<Accordion>
  <AccordionItem>
    <AccordionHeader>...</AccordionHeader>
    <AccordionBody>...</AccordionBody>
  </AccordionItem>
</Accordion>
*/
