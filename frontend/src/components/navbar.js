import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../components/firebase'; 
import { SearchContext } from '../components/searchContext';
import { FaSearch } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import strawberrycake from "../assets/strawberrycake.png";

const Navbar = ({ isSidebarOpen }) => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      window.location.href = "/login";
    } catch (error) {
      console.log('Error logging out: ', error.message);
    }
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/home':
        return 'Recipes';
      case '/addNewRecipe':
        return 'Add New Recipe';
      case '/favourites':
        return 'My Favourites';
      case '/courses':
        return 'Courses';
      case '/community':
        return 'Community';
      default:
        return '';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-pink-100 shadow-md">
      <div className="flex items-center space-x-4">
        <div className={`flex items-center transition-margin duration-300 ${isSidebarOpen ? 'ml-8' : 'ml-0'}`}>
          <img className="w-6 h-6 text-gray-500 mr-2" src={strawberrycake} alt="Logo"/>
          <h3 className="text-xl font-bold text-black">E.KAC -</h3>
          <h3 className="text-xl font-bold text-black ml-1">{getPageTitle()}</h3>
        </div>
      </div>
      {/* <div className={`flex flex-grow items-center transition-margin duration-300 ${isSidebarOpen ? 'ml-8' : 'ml-0'}`}>
        <FaSearch className="w-6 h-6 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Enter your search request..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 bg-transparent border-b border-gray-300 placeholder-gray-500 focus:outline-none"
        />
      </div> */}
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
