import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-500">

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4">
        {children}
      </main>

    </div>
  );
};

export default MainLayout;
