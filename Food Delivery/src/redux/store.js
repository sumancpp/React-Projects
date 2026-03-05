import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";   // ✅ import reducer correctly

export const store = configureStore({
  reducer: {
    cart: cartReducer,   // ✅ add reducer here
  },
});
