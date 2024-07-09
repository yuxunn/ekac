import React, { useState } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import SearchBar from './searchBar';
import { FaFilter } from "react-icons/fa";

const MainLayout = ({ children }) => {
  const [filter, setFilter] = useState('None');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-pink-100 min-h-screen">
        <Navbar />
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
          <FaFilter  />
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
        <div className="-mt-8">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
