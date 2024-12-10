'use client';
import React from 'react';
import { createPortal } from 'react-dom';

export default function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return createPortal(
    <div
      onClick={onClose}
      className='fixed left-0 top-10 z-[1000] flex size-full items-center justify-center bg-black bg-opacity-50'
    >
      <div
        className='relative z-[1001] max-w-screen-lg rounded-md bg-white px-6 pb-6 pt-10'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          title='閉じる'
          className='absolute right-2.5 top-2.5 flex size-6 items-center justify-center rounded bg-transparent text-gray-500 transition-colors hover:bg-gray-50'
          onClick={onClose}
        >
          <span className='i-tabler-circle-x' />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
