import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../components/firebase'; 
import { SearchContext } from '../components/searchContext';
import { FaSearch } from 'react-icons/fa';

const Navbar = (isSidebarOpen) => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  // console.log(isSidebarOpen)
  // console.log("hei")
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      window.location.href = "/login";
    } catch (error) {
      console.log('Error logging out: ', error.message);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-pink-100 shadow-md">
    <div className={`flex flex-grow items-center transition-margin duration-300 ${isSidebarOpen ? 'ml-8' : 'ml-0'}`}>
      <FaSearch className="w-6 h-6 text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Enter your search request..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 bg-transparent border-b border-gray-300 placeholder-gray-500 focus:outline-none"
      />
    </div>
      <button
        onClick={handleLogout}
        className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
      >
        Log Out
      </button>
    </div>
  );
};

export default Navbar;

