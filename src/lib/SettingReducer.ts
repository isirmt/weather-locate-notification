'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export const SETTINGS_LOCAL_STORAGE_KEY = 'settings_state';
export const SETTINGS_REDUX_KEY = 'settings';

export type SettingsState = {
  backgroundNoticeInterval: number, // min
}

const initialState: SettingsState = {
  backgroundNoticeInterval: 15,
};

const settingsSlice = createSlice({
  name: SETTINGS_REDUX_KEY,
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<SettingsState>) => {
      state.backgroundNoticeInterval = action.payload.backgroundNoticeInterval;
    }
  },
});

export const settingsReducer = settingsSlice.reducer;
export const { setSettings } = settingsSlice.actions;
