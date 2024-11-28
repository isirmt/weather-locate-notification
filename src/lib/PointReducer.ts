'use client';

import { WeatherPoint } from '@/types/WeatherPoint';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export const POINTS_LOCAL_STORAGE_KEY = 'weather_points_state';
export const POINTS_REDUX_KEY = 'weather_points';

export type PointState = {
  points: WeatherPoint[];
  currentPoint: WeatherPoint | null;
}

const initialState: PointState = {
  points: [],
  currentPoint: null
};

const pointsSlice = createSlice({
  name: POINTS_REDUX_KEY,
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

export const pointsReducer = pointsSlice.reducer;
export const { addPoint, deletePoint, clearPoints, changeCurrentPoint, setStateFromLocalStorage } = pointsSlice.actions;
