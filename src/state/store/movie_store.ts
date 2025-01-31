import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "@/api/movi_api";
import errorReducer from "../slices/errorSlice";
import authReducer from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    error: errorReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(movieApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
