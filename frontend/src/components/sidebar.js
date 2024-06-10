import React, { useState, useEffect } from 'react';
import { FaHeart, FaBook, FaUsers, FaGlobe, FaPlus, FaBars, FaAngleDoubleRight , FaAngleDoubleLeft} from 'react-icons/fa';
import { VscAccount } from "react-icons/vsc";
import strawberrycake from '../assets/strawberrycake.png';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../components/firebase';

const Sidebar = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [recipeCount, setRecipeCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const fetchUserData = async (user) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserDetails(docSnap.data());

        const recipesRef = collection(db, "recipes");
        const q = query(recipesRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        setRecipeCount(querySnapshot.size);
      } else {
        console.log("No such document!");
      }
    } else {
      console.log("User is not logged in");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      fetchUserData(user);
    });
    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-20 p-2 bg-transparent text-gray-800 rounded-full focus:outline-none ${isSidebarOpen ? 'hidden' : 'block'}`}
      >
        <FaAngleDoubleRight />
      </button>
      <div className={`fixed h-screen bg-white shadow-lg w-64 space-y-6 py-7 px-2 z-10 transition-transform duration-300 ${isSidebarOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`}>
        <button
          onClick={toggleSidebar}
          className={`absolute top-4 right-4 z-20 p-2 bg-transparent text-gray-800 rounded-full focus:outline-none ${isSidebarOpen ? 'block' : 'hidden'}`}
        >
          <FaAngleDoubleLeft />
        </button>
        <div className="flex items-center justify-center space-x-2">
          <img
            className="w-8 h-8"
            src={strawberrycake}
            alt="Logo"
          />
          <h1 className="text-2xl font-bold">ekac</h1>
        </div>
        <div className="flex flex-col items-center">
          <VscAccount className="w-24 h-16 rounded-full" alt="User Avatar" />
          {userDetails ? (
            <>
              <h2 className="mt-2 text-lg font-semibold">{userDetails.username}</h2>
              <div className="mt-4 bg-pink-100 text-red-600 py-2 px-4 rounded-full flex items-center">
                <span className="text-2xl">🍲</span>
                <span className="ml-2">{recipeCount}</span>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <nav className="space-y-2">
          <a href="/addNewRecipe" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-pink-100 flex items-center text-gray-600">
            <FaPlus className=" mr-3" />
            <span>Add New Recipe</span>
          </a>
          <a href="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-pink-100 flex items-center text-gray-600">
            <FaBook className=" mr-3" />
            <span>Recipes</span>
          </a>
          <a href="/favorites" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-pink-100 flex items-center text-gray-600">
            <FaHeart className=" mr-3" />
            <span>Favorites</span>
          </a>
          <a href="/courses" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-pink-100 flex items-center text-gray-600">
            <FaUsers className="mr-3" />
            <span>Courses</span>
          </a>
          <a href="/community" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-pink-100 flex items-center text-gray-600">
            <FaGlobe className=" mr-3" />
            <span>Community</span>
          </a>
        </nav>
      </div>
      <div className={`main-content transition-margin duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Main page content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
