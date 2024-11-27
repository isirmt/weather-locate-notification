'use client';

import { WeatherPoint } from '@/types/WeatherPoint';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'weather_points_state';
const REDUX_KEY = 'weather_points';

interface PointState {
  points: WeatherPoint[];
  currentPoint: WeatherPoint | null;
}

const initialState: PointState = {
  points: [],
  currentPoint: null
};

const pointsSlice = createSlice({
  name: REDUX_KEY,
  initialState,
  reducers: {
    setStateFromLocalStorage: (state, action: PayloadAction<PointState>) => {
      state.points = action.payload.points;
      state.currentPoint = action.payload.currentPoint;
    },
    addPoint: (state, action: PayloadAction<WeatherPoint>) => {
      state.points.push(action.payload);
    },
    deletePoint: (state, action: PayloadAction<string>) => {
      state.points = state.points.filter((point) => point.uuid !== action.payload);
      if (state.currentPoint?.uuid === action.payload) {
        state.currentPoint = state.points[0] || null;
      }
    },
    clearPoints: (state) => {
      state.points = [];
      state.currentPoint = null;
    },
    changeCurrentPoint: (state, action: PayloadAction<string>) => {
      state.currentPoint = state.points.find((point) => point.uuid === action.payload) || state.points[0] || null;
    }
  },
});

export const { addPoint, deletePoint, clearPoints, changeCurrentPoint, setStateFromLocalStorage } = pointsSlice.actions;

export const store = configureStore({
  reducer: {
    pointsState: pointsSlice.reducer,
  },
});

export const useSyncLocalStorage = () => {
  useEffect(() => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedState) {
      try {
        const parsedState: PointState = JSON.parse(savedState);
        store.dispatch({
          type: 'weather_points/setStateFromLocalStorage',
          payload: parsedState,
        });
      } catch (error) {
        console.error("Failed to parse localStorage state:", error);
      }
    }

    const unsubscribe = store.subscribe(() => {
      try {
        const state = store.getState().pointsState;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error("Failed to save state to localStorage:", error);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
