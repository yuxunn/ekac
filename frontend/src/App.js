import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/mainlayout';
import Signup from './pages/signup';
import LogIn from './pages/login';
import ProtectedRoute from './components/protectedRoute';
import AddRecipePage from './pages/addRecipePage';
import Home from './pages/home';
import Favourites from './pages/favourites';
import Community from './pages/community';
import { SearchProvider } from './components/searchContext';
import Chatbot from './components/chatbot';

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
                    <Chatbot/>
                  </MainLayout>
                }
              />
            }
          />
                    <Route
            path="/favourites"
            element={
              <ProtectedRoute
                element={
                  <MainLayout>
                    <Favourites />
                    <Chatbot/>

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
                    <Chatbot/>

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
