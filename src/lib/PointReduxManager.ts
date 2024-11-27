import { WeatherPoint } from '@/types/WeatherPoint';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PointState {
  points: WeatherPoint[];
  currentPoint: WeatherPoint;
}

const firstPoint: WeatherPoint = {
  uuid: "01391256-3664-4691-ae4a-7a1e3f2e4b5e",
  name: "東京駅",
  latitude: 35.681236,
  longitude: 139.767125
}

const initialState: PointState = {
  points: [firstPoint],
  currentPoint: firstPoint
};

const pointsSlice = createSlice({
  name: 'weather_points',
  initialState,
  reducers: {
    addPoint: (state, action: PayloadAction<WeatherPoint>) => {
      state.points.push(action.payload);
    },
    deletePoint: (state, action: PayloadAction<string>) => {
      state.points = state.points.length
        ? state.points.filter((point) => point.uuid !== action.payload)
        : state.points
    },
    clearPoints: (state) => {
      state.points = [];
    },
    changeCurrentPoint: (state, action: PayloadAction<string>) => {
      state.currentPoint = state.points.find((point) => point.uuid === action.payload) ?? state.points[0]
    }
  },
});

export const { addPoint, deletePoint, clearPoints, changeCurrentPoint } = pointsSlice.actions;

export const store = configureStore({
  reducer: {
    pointsState: pointsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
