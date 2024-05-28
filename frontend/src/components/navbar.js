import React from 'react';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-pink-100 shadow-md">
      <div className="flex items-center flex-grow">
        <svg className="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405M21 21l-1.405-1.405M16 8A6 6 0 104 8a6 6 0 0012 0z"></path>
        </svg>
        <input
          type="text"
          placeholder="Enter your search request..."
          className="w-full p-2 bg-transparent border-b border-gray-300 placeholder-gray-500 focus:outline-none"
        />
      </div>
      <button className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
        Go to Premium
      </button>
    </div>
  );
};

export default Navbar;