import React from 'react';
import strawberrycake from '../assets/strawberrycake.png'; 
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return(
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from pink-200 to-blue-300">
    <Link to="/signup">
    <button
            type="submit"
            className="ml -10 w-full py-3 bg-gradient-to-r from-pink-500 to-blue-400 text-white rounded hover:from-blue-400 hover:to-pink-500"
          >
            Join EKAC
          </button>
          </Link>
  </div>

)};


export default WelcomePage;