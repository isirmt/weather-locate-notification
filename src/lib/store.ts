'use client';

import { configureStore } from '@reduxjs/toolkit';
import { POINTS_LOCAL_STORAGE_KEY, POINTS_REDUX_KEY, pointsReducer } from './PointReducer';
import { SETTINGS_LOCAL_STORAGE_KEY, SETTINGS_REDUX_KEY, settingsReducer } from './SettingReducer';
import { useEffect } from 'react';

export const store = configureStore({
  reducer: {
    settingsState: settingsReducer,
    pointsState: pointsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSyncLocalStorage = () => {
  useEffect(() => {
    const initialize = (localStorageKey: string, type: string) => {
      const savedState = localStorage.getItem(localStorageKey);
      if (savedState) {
        try {
          const parsedState = JSON.parse(savedState);
          store.dispatch({
            type,
            payload: parsedState,
          });
        } catch (error) {
          console.error("Failed to parse localStorage state:", error);
        }
      }
    }

    initialize(POINTS_LOCAL_STORAGE_KEY, `${POINTS_REDUX_KEY}/setStateFromLocalStorage`);
    initialize(SETTINGS_LOCAL_STORAGE_KEY, `${SETTINGS_REDUX_KEY}/setSettings`);

    const unsubscribe = store.subscribe(() => {
      try {
        const save = (item: object, localStorageKey: string) =>
          localStorage.setItem(localStorageKey, JSON.stringify(item));

        save(store.getState().pointsState, POINTS_LOCAL_STORAGE_KEY);
        save(store.getState().settingsState, SETTINGS_LOCAL_STORAGE_KEY);
      } catch (error) {
        console.error("Failed to save state to localStorage:", error);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
}