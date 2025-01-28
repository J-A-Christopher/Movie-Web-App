import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "@/api/movi_api";
import errorReducer from '../slices/errorSlice';

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    error:errorReducer
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(movieApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
