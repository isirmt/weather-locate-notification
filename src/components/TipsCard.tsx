import React from 'react';

export function TipsBulbCard({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex overflow-hidden rounded bg-violet-200'>
      <div className='flex items-center bg-violet-600 p-1 font-bold text-white'>
        <span className='i-tabler-bulb size-6' />
      </div>
      <div className='p-2 text-sm'>{children}</div>
    </div>
  );
}

export function WarningCard({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex overflow-hidden rounded bg-orange-200'>
      <div className='flex items-center bg-orange-600 p-1 font-bold text-white'>
        <span className='i-tabler-exclamation-circle size-6' />
      </div>
      <div className='p-2 text-sm'>{children}</div>
    </div>
  );
}
