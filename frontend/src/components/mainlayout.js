import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-pink-100 min-h-screen">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
