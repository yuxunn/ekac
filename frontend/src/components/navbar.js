import React, { useContext , useState} from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../components/firebase'; 
import { SearchContext } from '../components/searchContext';
import { useLocation } from 'react-router-dom';
import strawberrycake from "../assets/strawberrycake.png";
import Loading2 from '../animations/loading2';
import Modal from '../components/modal';
const Navbar = ({ isSidebarOpen }) => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const location = useLocation();
  const isAddRecipePage = location.pathname === '/addNewRecipe';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmLogout = () => {
    handleLogout();
    closeModal();
  };
  const handleLogout = async () => {
    setIsSubmitting(true);
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

  if (isSubmitting) {
    return <Loading2/>;
  }

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
        onClick={openModal}
        className="ml-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray focus:outline-none"
      >
        Log Out
      </button>
      <Modal
      isOpen = {isModalOpen}
      onClose ={closeModal}
      onConfirm ={confirmLogout}
      title = "Logout"
      message = "Are you sure you want to sign out?"
    />
    </div>
  );
};

export default Navbar;
