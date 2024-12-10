'use client';
import { createContext, useContext, useState } from 'react';
import React from 'react';
import Overlay from './Overlay';

const OverlayContext = createContext({
  // eslint-disable-next-line no-unused-vars
  openOverlay: (content: React.ReactNode) => {},
  closeOverlay: () => {},
});

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [overlays, setOverlays] = useState<React.ReactNode[]>([]);

  const openOverlay = (content: React.ReactNode) => {
    setOverlays((prev) => [...prev, content]);
  };

  const closeOverlay = () => {
    setOverlays((prev) => prev.slice(0, -1));
  };

  return (
    <OverlayContext.Provider value={{ openOverlay, closeOverlay }}>
      {children}
      {overlays.map((content, index) => (
        <Overlay key={index} onClose={closeOverlay}>
          {content}
        </Overlay>
      ))}
    </OverlayContext.Provider>
  );
}

export const useOverlay = () => useContext(OverlayContext);
