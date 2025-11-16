import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItem: [],
    totalPrice: 0,
    totalQuantity: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const findIndex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id
      );

      if (findIndex >= 0) {
        state.cartItem[findIndex].quantity += 1;
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        state.cartItem.push(newItem);
      }

      state.totalPrice = state.cartItem.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.totalQuantity = state.cartItem.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },

    decreaseCart: (state, action) => {
      const findIndex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id
      );
      if (findIndex >= 0 && state.cartItem[findIndex].quantity > 1) {
        state.cartItem[findIndex].quantity -= 1;
      }

      state.totalPrice = state.cartItem.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.totalQuantity = state.cartItem.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },

    increaseCart: (state, action) => {
      const findIndex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id
      );
      if (findIndex >= 0) {
        state.cartItem[findIndex].quantity += 1;
      }

      state.totalPrice = state.cartItem.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.totalQuantity = state.cartItem.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },

    removeElement: (state, action) => {
      state.cartItem = state.cartItem.filter((ele) => ele.id !== action.payload);
      state.totalPrice = state.cartItem.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.totalQuantity = state.cartItem.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },

    removeAllCartItem: (state) => {
      state.cartItem = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },

    cartTotalPriceAndQuantity: (state) => {
      state.totalPrice = state.cartItem.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.totalQuantity = state.cartItem.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
  },
});

export const {
  addToCart,
  decreaseCart,
  increaseCart,
  removeElement,
  removeAllCartItem,
  cartTotalPriceAndQuantity,
} = CartSlice.actions;

export default CartSlice.reducer;
