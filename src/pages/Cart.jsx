import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeElement,
  decreaseCart,
  increaseCart,
} from "../redux/features/cartSlice.js";

const Cart = () => {
  const dispatch = useDispatch();

  const cartdata = useSelector((state)=>state.cart.cartItem)
  console.log("cart data is", cartdata);
  

  console.log("Cart State:", cartdata);

  return (
    <>
    <h1>cart</h1>
    </>
  );
};

export default Cart;
