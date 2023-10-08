import { useEffect, useRef } from 'react';

export const useLayer = () => {
  const layerRef = useRef<HTMLDivElement>();

  // Remove layer when unmounting
  useEffect(
    () => () => {
      if (layerRef.current) {
        layerRef.current.remove();
      }
    },
    [],
  );

  return () => {
    if (!layerRef.current) {
      layerRef.current = document.createElement('div');
      document.body.append(layerRef.current);
    }

    return layerRef.current;
  };
};
