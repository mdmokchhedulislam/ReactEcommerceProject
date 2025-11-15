import { useState } from "react";




// Main Cart Page Component
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-2">
          
            </p>
          </div>
          
          <div className="flex items-center gap-4">
 
            
            <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-2">
              <span className="text-lg">🔄</span>
              Update Cart
            </button>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Cart Header */}
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Cart Items
                  </h2>
                  <span className="text-sm text-gray-600">
               
                  </span>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="p-6 space-y-6">
    
              </div>
            </div>

            {/* Trust Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Free Shipping</h3>
                <p className="text-gray-600 text-sm">Free shipping on orders over $50</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">↩️</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
                <p className="text-gray-600 text-sm">30-day money-back guarantee</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
                <p className="text-gray-600 text-sm">Your payment information is safe</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
   
            
            {/* Continue Shopping */}
            <div className="mt-6 text-center">
              <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors inline-flex items-center gap-2">
                <span>←</span>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;