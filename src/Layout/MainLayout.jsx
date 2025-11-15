import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-500">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
