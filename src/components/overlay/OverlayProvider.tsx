/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { createContext, useContext, useState } from "react";
import Overlay from "./Overlay";
import React from "react";

const OverlayContext = createContext({
  openOverlay: (_content: React.ReactNode) => {},
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
  )
}

export const useOverlay = () => useContext(OverlayContext)