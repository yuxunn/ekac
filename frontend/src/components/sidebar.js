import React, { useState, useEffect } from 'react';
import { FaHeart, FaBook, FaUsers, FaGlobe, FaPlus } from 'react-icons/fa';
import { VscAccount } from "react-icons/vsc";
import strawberrycake from '../assets/strawberrycake.png';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../components/firebase'; 

const Sidebar = () => {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async (user) => {
    if (user) {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
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

  return (
    <div className="h-screen bg-white shadow-lg w-64 space-y-6 py-7 px-2">
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
            <div className="mt-4 bg-red-100 text-red-600 py-2 px-4 rounded-full flex items-center">
              <span className="text-2xl">🍲</span> 
              <span className="ml-2">37</span>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <nav className="space-y-2">
        <a href="/addNewRecipe" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 flex items-center text-gray-600">
            <FaPlus className=" mr-3" />
            <span>Add New Recipe</span>
          </a>
        <a href="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 flex items-center text-gray-600">
          <FaBook className=" mr-3" />
          <span>Recipes</span>
        </a>
        <a href="/favorites" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 flex items-center text-gray-600">
          <FaHeart className=" mr-3" />
          <span>Favorites</span>
        </a>
        <a href="/courses" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 flex items-center text-gray-600">
          <FaUsers className="mr-3" />
          <span>Courses</span>
        </a>
        <a href="/community" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 flex items-center text-gray-600">
          <FaGlobe className=" mr-3" />
          <span>Community</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
