export const isHTMLElement = (element: unknown): element is HTMLElement => {
  const nodeType =
    element && typeof element === 'object' && 'nodeType' in element
      ? (element as Node).nodeType
      : null;

  return nodeType === Node.ELEMENT_NODE || nodeType === Node.DOCUMENT_NODE;
};
