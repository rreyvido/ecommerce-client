import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    quantity: 0,
  },
  reducers: {
    addQuantity: (state, action) => {
      state.quantity = state.quantity + action.payload;
    },
    removeQuantity: (state, action) => {
      return { ...state, quantity: action.payload };
    },
    getQuantity: (state, action) => {
      return { ...state, quantity: action.payload };
    },
  },
});

export const { addQuantity, removeQuantity, getQuantity } = cartSlice.actions;
export default cartSlice.reducer;
