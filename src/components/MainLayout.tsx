import React from "react";

export default function Main({ children }: { children?: React.ReactNode }) {
  return <main className="flex-grow overflow-y-auto lg:ml-64 relative transition-transform flex flex-col items-center lg:rounded-md">
    {children}
  </main>
}