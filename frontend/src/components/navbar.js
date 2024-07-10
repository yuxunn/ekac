import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../components/firebase'; 
import { SearchContext } from '../components/searchContext';
import { useLocation } from 'react-router-dom';
import strawberrycake from "../assets/strawberrycake.png";

const Navbar = ({ isSidebarOpen }) => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const location = useLocation();
  const isAddRecipePage = location.pathname === '/addNewRecipe';


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
        return 'recipes';
      case '/recipes':
        return 'recipes';
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
<div className={`flex items-center justify-between p-4 bg-pink-100 shadow-lg`} style={{ height: '64px' }}>
      <div className="flex items-center space-x-2 md:space-x-4">
        <div className={`flex items-center transition-margin duration-300 ${isSidebarOpen ? 'ml-8' : 'ml-0'}`}>
          <img className="w-6 h-6 text-gray-500 mr-2" src={strawberrycake} alt="Logo"/>
          <span className="text-xl font-bold text-black whitespace-nowrap">ekac -</span>
          <h3 className="text-xl font-bold text-black ml-1">{getPageTitle()}</h3>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="ml-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray focus:outline-none"
      >
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
