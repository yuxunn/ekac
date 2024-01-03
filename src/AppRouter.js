// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AddRecipe from './pages/AddRecipe';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/addrecipe" element ={<AddRecipe/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
