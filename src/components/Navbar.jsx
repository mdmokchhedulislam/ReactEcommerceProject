import React, { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
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

  // Navigation data
  const navigation = {
    logo: {
      // text: "YourBrand",
      icon: "MS46",
    },
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
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-2xl">{navigation.logo.icon}</span>
              <span className={`font-bold text-xl ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                {navigation.logo.text}
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navigation.menu.map((item, index) => (
              <div key={item.name} className="relative" ref={dropdownRef}>
                {item.type === 'link' ? (
                  <a
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      scrolled
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                        : 'text-white hover:text-blue-200 hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                      scrolled
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                        : 'text-white hover:text-blue-200 hover:bg-white/10'
                    }`}
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
                      <a
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="flex items-start space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                      >
                        <span className="text-lg mt-0.5">{dropdownItem.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-blue-600">
                            {dropdownItem.name}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {dropdownItem.description}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}

                {/* Mega Menu */}
                {activeDropdown === index && item.type === 'mega-menu' && (
                  <div className="absolute top-full left-0 mt-2 w-screen max-w-4xl bg-white rounded-lg shadow-xl border border-gray-200 p-6 z-50">
                    <div className="grid grid-cols-2 gap-8">
                      {item.items.map((column, colIndex) => (
                        <div key={colIndex}>
                          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                            {column.title}
                          </h3>
                          <div className="space-y-3">
                            {column.links.map((link) => (
                              <a
                                key={link.name}
                                href={link.href}
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                              >
                                <span className="text-lg">{link.icon}</span>
                                <span className="text-gray-700 group-hover:text-blue-600 font-medium">
                                  {link.name}
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {navigation.auth.map((item) => (
              item.type === 'button' ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                >
                  {item.name}
                </a>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className={`font-medium text-sm ${
                    scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                  }`}
                >
                  {item.name}
                </a>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md rounded-lg shadow-lg mt-2 py-2 border border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.menu.map((item) => (
                <div key={item.name}>
                  {item.type === 'link' ? (
                    <a
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <div className="space-y-1">
                      <div className="px-3 py-2 text-base font-medium text-gray-700">
                        {item.name}
                      </div>
                      <div className="pl-4 space-y-1 border-l-2 border-gray-200 ml-3">
                        {item.items.flatMap(column => 
                          'links' in column ? column.links : column
                        ).map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="mr-2">{subItem.icon}</span>
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-2 space-y-3">
                {navigation.auth.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`block text-center px-3 py-2 rounded-md text-base font-medium ${
                      item.type === 'button'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;