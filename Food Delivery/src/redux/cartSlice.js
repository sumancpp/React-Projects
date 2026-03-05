import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const item = state.find(i => i.id === action.payload.id);
      if (item) {
        item.qty += action.payload.qty;
      } else {
        state.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    increaseQty: (state, action) => {
      const item = state.find(i => i.id === action.payload);
      if (item) {
        item.qty += 1;
      }
    },
    decreaseQty: (state, action) => {
      const item = state.find(i => i.id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    }
  }
});

export const { addItem, removeItem, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
