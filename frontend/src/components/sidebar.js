import React, { useState, useEffect } from "react";
import {
  FaHeart,
  FaBook,
  FaUsers,
  FaGlobe,
  FaPlus,
  FaBars,
  FaAngleDoubleLeft,
  FaUserCircle,
} from "react-icons/fa";
import strawberrycake from "../assets/strawberrycake.png";
import {
  doc,
  getDoc,
  collection,
  query,
  getDocs, onSnapshot
} from "firebase/firestore";
import { auth, db } from "../components/firebase";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [recipeCount, setRecipeCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigate = useNavigate();

  const fetchUserData = async (user) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        const q = query(collection(db, "users", user.uid, "recipes"));
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
      if (user) {
        const q = query(collection(db, "users", user.uid, "recipes"));
        const unsubscribeRecipes = onSnapshot(q, (querySnapshot) => {
          setRecipeCount(querySnapshot.size);
        });
        // Cleanup listener on unmount
        return () => unsubscribeRecipes();
      }
    });

    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleHomeClick = () => {
    navigate("/recipes");
  };

  return (
    <div className="relative flex">
      <div
        className={`fixed h-screen bg-white shadow-lg py-7 px-2 z-10 transition-transform duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className={`absolute top-4 right-4 z-20 p-2 bg-transparent text-gray-800 rounded-full focus:outline-none ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <FaAngleDoubleLeft className="text-lg" />
        </button>
        <button
          className="items-center flex justify-center w-full"
          onClick={isSidebarOpen ? handleHomeClick : toggleSidebar}
        >
          
          <div className="flex items-center space-x-2">
            {isSidebarOpen ? (
              <img className="w-8 h-8" src={strawberrycake} alt="Logo" onClick={handleHomeClick} />
            ) : (
              <FaBars className="text-lg" />
            )}
            {isSidebarOpen && <h1 className="text-2xl font-bold">ekac</h1>}
          </div>
        </button>
        <div className="flex flex-col items-center mt-4">
          <Link to="/profile">
            {userDetails && (
              <img
                className="w-8 h-8 rounded-full"
                src={userDetails.avatar}
                alt="User Avatar"
              />
            )}
          </Link>
          {userDetails ? (
            <>
              {isSidebarOpen && (
                <>
                  <Link to="/profile">
                    <h2 className="mt-2 text-lg font-semibold underline">
                      {userDetails.username}
                    </h2>
                  </Link>
                  <div className="mt-4 bg-pink-100 text-red-600 py-2 px-4 rounded-full flex items-center">
                    <span className="text-2xl">🍲</span>
                    <span className="ml-2">{recipeCount}</span>
                  </div>
                </>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <nav className="space-y-4 mt-6">
          <a
            href="/recipes"
            className="flex items-center py-2 px-4 rounded transition duration-200 hover:bg-pink-100 text-gray-600"
          >
            <FaBook
              className={`text-lg ${
                isSidebarOpen ? "mr-3" : "mx-auto"
              }`}
            />
            {isSidebarOpen && <span>Recipes</span>}
          </a>
          <a
            href="/addNewRecipe"
            className="flex items-center py-2 px-4 rounded transition duration-200 hover:bg-pink-100 text-gray-600"
          >
            <FaPlus
              className={`text-lg ${
                isSidebarOpen ? "mr-3" : "mx-auto"
              }`}
            />
            {isSidebarOpen && <span>Add New Recipe</span>}
          </a>
          <a
            href="/favourites"
            className="flex items-center py-2 px-4 rounded transition duration-200 hover:bg-pink-100 text-gray-600"
          >
            <FaHeart
              className={`text-lg ${
                isSidebarOpen ? "mr-3" : "mx-auto"
              }`}
            />
            {isSidebarOpen && <span>My Favourites</span>}
          </a>
          <a
            href="/courses"
            className="flex items-center py-2 px-4 rounded transition duration-200 hover:bg-pink-100 text-gray-600"
          >
            <FaUsers
              className={`text-lg ${
                isSidebarOpen ? "mr-3" : "mx-auto"
              }`}
            />
            {isSidebarOpen && <span>Courses</span>}
          </a>
          <a
            href="/community"
            className="flex items-center py-2 px-4 rounded transition duration-200 hover:bg-pink-100 text-gray-600"
          >
            <FaGlobe
              className={`text-lg ${
                isSidebarOpen ? "mr-3" : "mx-auto"
              }`}
            />
            {isSidebarOpen && <span>Community</span>}
          </a>
        </nav>
      </div>
      <div
        className={`main-content transition-margin duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      ></div>
    </div>
  );
};

export default Sidebar;
