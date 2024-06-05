import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/mainlayout';
import './tailwind.css';
import Signup from './pages/signup';
import LogIn from './pages/login';
import ProtectedRoute from './components/protectedRoute';
import AddRecipePage from './pages/addRecipePage'; // Import AddRecipePage
import Home from './pages/home';
import Community from './pages/community';
import Recipe from './components/recipe';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute
              element={
                <MainLayout>
                  <Home />
                </MainLayout>
              }
            />
          }
        />
        <Route
          path="/addNewRecipe"
          element={
            <ProtectedRoute
              element={
                  <AddRecipePage />
              }
            />
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute
              element={
                <MainLayout>
                  <Community />
                </MainLayout>
              }
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
