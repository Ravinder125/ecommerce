import { configureStore } from "@reduxjs/toolkit";
import { syncProfileAPI } from "./api/syncProfileAPI";
import { productAPI } from "./api/productAPI";
import { statsAPI } from "./api/statsAPI";
import cartSlice from "./reducers/cartSlice";
import userSlice from './reducers/authSlice';
import { transactionAPI } from "./api/transactionAPI";

export const store = configureStore({
  reducer: {
    [syncProfileAPI.reducerPath]: syncProfileAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [statsAPI.reducerPath]: statsAPI.reducer,
    [transactionAPI.reducerPath]: transactionAPI.reducer,
    user: userSlice,
    cart: cartSlice
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(
        syncProfileAPI.middleware,
        productAPI.middleware,
        statsAPI.middleware,
        transactionAPI.middleware,
      )
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
