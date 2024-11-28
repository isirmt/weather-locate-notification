import React from "react";

export function TipsBulbCard({ children }: { children: React.ReactNode }) {
  return <div className="relative bg-violet-200 rounded overflow-hidden flex">
    <div className="text-white font-bold p-1 bg-violet-600 flex items-center">
      <span className="i-tabler-bulb size-6" />
    </div>
    <div className="p-2 text-sm">
      {children}
    </div>
  </div>
}

export function WarningCard({ children }: { children: React.ReactNode }) {
  return <div className="relative bg-orange-200 rounded overflow-hidden flex">
    <div className="text-white font-bold p-1 bg-orange-600 flex items-center">
      <span className="i-tabler-exclamation-circle size-6" />
    </div>
    <div className="p-2 text-sm">
      {children}
    </div>
  </div>
}