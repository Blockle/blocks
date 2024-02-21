import { useEffect, useRef } from 'react';

export const useLayer = () => {
  const layerRef = useRef<HTMLDivElement>();

  // Remove layer when unmounting
  useEffect(
    () => () => {
      if (layerRef.current) {
        layerRef.current.remove();
        layerRef.current = undefined;
      }
    },
    [],
  );

  return () => {
    if (!layerRef.current) {
      const div = document.createElement('div');
      div.dataset.layer = 'blocks';

      layerRef.current = div;
      document.body.append(layerRef.current);
    }

    return layerRef.current;
  };
};
