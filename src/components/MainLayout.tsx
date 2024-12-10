import React from 'react';

export default function Main({ children }: { children?: React.ReactNode }) {
  return (
    <main className='relative flex flex-grow flex-col items-center overflow-y-auto transition-transform lg:ml-64 lg:rounded-md'>
      {children}
    </main>
  );
}
