'use client';
import { createPortal } from "react-dom";

export default function Overlay({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
  return createPortal(
    <div
      onClick={onClose}
      className="fixed top-10 left-0 size-full bg-black bg-opacity-50 z-[1000] flex items-center justify-center"
    >
      <div className="relative bg-white rounded-md z-[1001] px-6 pb-6 pt-10" onClick={(e) => e.stopPropagation()}>
        <button
          title="閉じる"
          className="absolute top-2.5 right-2.5 text-gray-500 hover:bg-gray-50 bg-transparent transition-colors size-6 flex justify-center items-center rounded"
          onClick={onClose}
        >
          <span className="i-tabler-circle-x" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}