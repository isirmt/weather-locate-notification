'use client';

import { store } from '@/lib/PointReduxManager';
import React from 'react';
import { Provider } from 'react-redux';

export default function PointsReduxWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
