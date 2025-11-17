import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeElement,
  decreaseCart,
  increaseCart,
  removeAllCartItem,
} from "../redux/features/cartSlice.js";

const Cart = () => {
  const dispatch = useDispatch();
  const cartdata = useSelector((state) => state.cart.cartItem);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Shopping Cart ({totalQuantity})
      </h1>

      {cartdata.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {cartdata.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-xl shadow-md flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-500 mt-2">Price: ${item.price}</p>
                  <p className="text-gray-500 mt-1">Quantity: {item.quantity}</p>
                </div>

                <div className="flex mt-4 justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => dispatch(decreaseCart(item))}
                    >
                      -
                    </button>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => dispatch(increaseCart(item))}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
                    onClick={() => dispatch(removeElement(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-md h-fit">
            <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Total Items:</span>
              <span>{totalQuantity}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Total Price:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-red-500 text-white py-2 rounded mb-2 hover:bg-red-600"
              onClick={() => dispatch(removeAllCartItem())}
            >
              Clear Cart
            </button>
            <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
