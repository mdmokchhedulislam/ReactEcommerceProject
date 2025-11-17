import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline'; // You can install heroicons or use your own icon

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Get cart items from Redux
  const cartItems = useSelector((state) => state.cart.cartItems || []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigation = {
    logo: { icon: "MS46" },
    menu: [
      { name: "Home", href: "/", type: "link" },
      { 
        name: "Products", 
        type: "dropdown",
        items: [
          { name: "ITEM1", href: "#", description: "item1 description", icon: "1" },
        ]
      },
      { name: "Pricing", href: "#", type: "link" },
      { name: "About", href: "#", type: "link" }
    ],
    auth: [
      { name: "Login", href: "login", type: "link" },
      { name: "Sign Up", href: "signup", type: "button" }
    ]
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/50 backdrop-blur-md shadow-lg border-b border-gray-500' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">{navigation.logo.icon}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navigation.menu.map((item, index) => (
              <div key={item.name} className="relative" ref={dropdownRef}>
                {item.type === 'link' ? (
                  <Link
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100' : 'text-white hover:text-blue-200 hover:bg-white/10'}`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${scrolled ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100' : 'text-white hover:text-blue-200 hover:bg-white/10'}`}
                  >
                    <span>{item.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}

                {/* Dropdown Menu */}
                {activeDropdown === index && item.type === 'dropdown' && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {item.items.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        to={dropdownItem.href}
                        className="flex items-start space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                      >
                        <span className="text-lg mt-0.5">{dropdownItem.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-blue-600">{dropdownItem.name}</div>
                          <div className="text-sm text-gray-500 mt-1">{dropdownItem.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side: Auth + Cart */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <ShoppingCartIcon className={`w-6 h-6 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {navigation.auth.map((item) => (
              item.type === 'button' ? (
                <Link key={item.name} to={item.href} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                  {item.name}
                </Link>
              ) : (
                <Link key={item.name} to={item.href} className={`font-medium text-sm ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu (you can also add cart here similarly) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md rounded-lg shadow-lg mt-2 py-2 border border-gray-200">
            {/* Your mobile menu content */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
