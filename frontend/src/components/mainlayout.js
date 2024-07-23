import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import SearchBar from "./searchBar";
import { FaFilter } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { auth, db } from "../components/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import Community from "../pages/community";

const recipeTypes = {
  Meat: '🍖',
  Fish: '🐟',
  Vege: '🥗',
  Matcha: '🍵',
  Chocolate: '🍫',
  Strawberry: '🍓',
  default: '🍲'
};

const MainLayout = ({ children }) => {
  const [filter, setFilter] = useState("None");
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const location = useLocation();
  const isAddRecipePage = location.pathname === "/addNewRecipe";
  const isEditRecipePage = location.pathname === "/editRecipe";

  useEffect(() => {
    const fetchRecipes = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const q = query(collection(db, "users", user.uid, "recipes"));
          const querySnapshot = await getDocs(q);
          const fetchedRecipes = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setRecipes(fetchedRecipes);
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    let newFilteredRecipes = recipes;

    if (filter !== "None" && recipeTypes[filter]) {
      newFilteredRecipes = recipes.filter(
        (recipe) => recipe.type === filter
      );
    } else if (filter === "DateCreated") {
      newFilteredRecipes = recipes
        .slice()
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFilteredRecipes(newFilteredRecipes);
  }, [filter, recipes]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const recipesToPass = filter === "None" ? recipes : filteredRecipes;

  return (
    <div className="flex">
      <Sidebar />
      <div
        className={`flex-1 min-h-screen ${
          isAddRecipePage
            ? "bg-[#ede9fe]"
            : isEditRecipePage
            ? "bg-[#ede9fe]"
            : "bg-pink-100"
        }`}
      >
        <Navbar />
        {!isAddRecipePage && !isEditRecipePage && (
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center">
              <FaFilter />
              <label htmlFor="filter" className="mr-2 ml-2 font-semibold">
                Filter by:
              </label>
              <select
                id="filter"
                value={filter}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded p-2 shadow-sm"
              >
                <option value="None">None</option>
                <option value="DateCreated">Date Created</option>
                {Object.keys(recipeTypes).map(type => (
                  <option key={type} value={type}>{recipeTypes[type]} {type}</option>
                ))}
              </select>
            </div>
            <SearchBar />
          </div>
        )}
        <div>
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child, { recipes: recipesToPass, filter })
              : null
          )}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
