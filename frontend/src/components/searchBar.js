import React, { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { SearchContext } from '../components/searchContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  return (
    <div className="flex items-center border-gray-300 placeholder-gray-500  bg-transparent border-b p-2 shadow-sm w-full md:w-1/2 lg:w-1/3">
      <FaSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Enter your search request..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-transparent focus:outline-none w-full"
      />
    </div>
  );
};

export default SearchBar;
