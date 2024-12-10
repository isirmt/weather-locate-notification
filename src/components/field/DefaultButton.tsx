'use client';

import React from 'react';

type InputProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function DefaultButton(props: InputProps) {
  return (
    <button
      className='w-48 rounded bg-sky-700 p-1 font-bold text-white transition-colors hover:bg-sky-600'
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
