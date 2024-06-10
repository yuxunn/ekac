import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/mainlayout';
import Signup from './pages/signup';
import LogIn from './pages/login';
import ProtectedRoute from './components/protectedRoute';
import AddRecipePage from './pages/addRecipePage';
import Home from './pages/home';
import Community from './pages/community';
import Recipe from './components/recipe';
import WelcomePage from './pages/welcomePage';
import { SearchProvider } from './components/searchContext';

const App = () => {
  return (
    <SearchProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LogIn />} />
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
                element={<AddRecipePage />}
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
          <Route
          path="/recipes"
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
        </Routes>
      </Router>
    </SearchProvider>
  );
};

export default App;
