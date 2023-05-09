import {
  configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import AuthSlice from "../features/Auth/AuthSlice";
import AppSlice from "../features/Apps/AppSlice";
import { listenerMiddleware } from "./listenerMiddleware";


import '../middlewares/AppMiddlewares'


export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    apps: AppSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().prepend(listenerMiddleware.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
