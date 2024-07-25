import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import authSlice from "./slices/authSlice";
import wishlistSlice from "./slices/wishlistSlice";
import cartSlice from "./slices/cartSlice";
import { userApi } from "./api/userApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    wishlist: wishlistSlice,
    cart: cartSlice,
    [api.reducerPath]: api.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(userApi.middleware),
});
