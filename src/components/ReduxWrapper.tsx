'use client';

import { store } from '@/lib/store';
import React from 'react';
import { Provider } from 'react-redux';
import StoreSync from './StoreSync';

export default function ReduxWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StoreSync />
      {children}
    </Provider>
  );
}
