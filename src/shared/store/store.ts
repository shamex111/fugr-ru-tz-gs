import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { repositoriesReducer } from '@/entities/repositories/store';

export const reducers = combineReducers({
  repositoriesReducer
});

export const store = configureStore({
  reducer: reducers
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
