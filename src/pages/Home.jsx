import React, { useState } from "react";
import productsData from "../data/product_data";
import categories from "../data/category";
import { addToCart } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import ProductCard from "../components/productcomponent/ProductCart";

const Home = () => {
  const dispatch = useDispatch();
  const [products] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const onAddToCart = (product) => {
    dispatch(addToCart(product));
    console.log("Cart added successfully", product.id);
  };

  // Filter products by category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return (a.id || a._id) - (b.id || b._id);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to <span className="block text-yellow-300">TechStore</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover the latest gadgets and tech accessories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Shop Now
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-purple-700 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              View Deals
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Products
              </h2>
              <p className="text-gray-600 mt-2">
                Discover our most popular items
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All</option>
                {categories.map((categoryObj) => (
                  <option key={categoryObj.name} value={categoryObj.name}>
                    {categoryObj.name} ({categoryObj.count})
                  </option>
                ))}
              </select>

              {/* Sort Filter */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id || product._id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Product Card Component

<ProductCard />


export default Home;
