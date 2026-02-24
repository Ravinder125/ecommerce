import { configureStore } from "@reduxjs/toolkit";
import { syncProfileAPI } from "./api/syncProfileAPI";
import { productAPI } from "./api/productApi";
import cartSlice from "./reducers/cartSlice";
import userSlice from './reducers/authSlice';
// ApiProvider.tsx
// import { useAuth } from "@clerk/clerk-react"
// import { createClerkApi } from "./createApiWithClerk"
// import { Provider } from "react-redux"
// import { configureStore } from "@reduxjs/toolkit"

// export default function ApiProvider({ children }: any) {
//   const { getToken } = useAuth()

//   const api = syncProfileAPI(getToken)

//   const store = configureStore({
//     reducer: {
//       [api.reducerPath]: api.reducer,
//       user: userSlice
//     },
//     middleware: (gDM) => gDM().concat(api.middleware)
//   })

//   return <Provider store={store}>{children}</Provider>
// }
export const store = configureStore({
  reducer: {
    [syncProfileAPI.reducerPath]: syncProfileAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    user: userSlice,
    cart: cartSlice
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(
        syncProfileAPI.middleware,
        productAPI.middleware,
      )
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
