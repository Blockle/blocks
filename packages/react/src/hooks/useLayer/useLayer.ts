import { useEffect, useRef } from 'react';

export const useLayer = (): (() => HTMLDivElement) => {
  const layerRef = useRef<HTMLDivElement>(null);

  // Remove layer when unmounting
  useEffect(
    () => () => {
      if (layerRef.current) {
        layerRef.current.remove();
        layerRef.current = null;
      }
    },
    [],
  );

  function getLayer() {
    if (!layerRef.current) {
      const div = document.createElement('div');
      div.dataset.layer = 'blocks';

      layerRef.current = div;
      document.body.append(layerRef.current);
    }

    return layerRef.current;
  }

  return getLayer;
};
