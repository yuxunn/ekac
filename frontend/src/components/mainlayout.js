import React, { useState } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import SearchBar from './searchBar';
import { FaFilter } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const [filter, setFilter] = useState('None');
  const location = useLocation();
  const isAddRecipePage = location.pathname === '/addNewRecipe';
  const isRecipePage = location.pathname === '/recipes';
  const isEditRecipePage = location.pathname === '/editRecipe';
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className={`flex-1 min-h-screen ${isAddRecipePage? 'bg-[#ede9fe]' : isEditRecipePage? 'bg-[#ede9fe]': 'bg-pink-100'}`}>
        <Navbar />
        {!isAddRecipePage &&  !isEditRecipePage && (
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center">
              <FaFilter />
              <label htmlFor="filter" className="mr-2 ml-2 font-semibold">Filter by:</label>
              <select
                id="filter"
                value={filter}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded p-2 shadow-sm"
              >
                <option value="None">None</option>
                <option value="Option1">Option 1</option>
                <option value="Option2">Option 2</option>
                <option value="Option3">Option 3</option>
              </select>
            </div>
            <SearchBar />
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
