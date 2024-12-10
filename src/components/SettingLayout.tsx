import React from 'react';

export function Field({ children }: { children: React.ReactNode }) {
  return <div className='flex w-full flex-wrap items-center justify-center gap-2 md:justify-between'>{children}</div>;
}

export function Label({ children }: { children: React.ReactNode }) {
  return <div className='w-1/2 text-sm'>{children}</div>;
}
