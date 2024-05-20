import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/lib/api/api';
import moviesFiltersSlice from './reducers/moviesFiltersSlice';
import isOpenModalSlice from './reducers/isOpenModalSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      moviesFiltersSlice,
      isOpenModalSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
