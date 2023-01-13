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
    resetQuantity: (state, action) => {
      state.quantity = 0;
    },
  },
});

export const { addQuantity, removeQuantity, getQuantity, resetQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
