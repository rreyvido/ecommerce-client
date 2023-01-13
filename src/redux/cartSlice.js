import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: {},
    bill: 0,
    quantity: 0,
  },
  reducers: {
    getProduct: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products = action.payload;
    },
    removeProduct: (state, action) => {
      state.products = action.payload;
    },
    getQuantity: (state, action) => {
      return { ...state, quantity: action.payload };
    },
  },
});

export const { getProduct, addProduct, removeProduct, getQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
