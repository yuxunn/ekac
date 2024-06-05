import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Recipe from "./components/recipe"; // This will be the recipe detail component
import MainLayout from './components/mainlayout'; // Import MainLayout
import './tailwind.css';
import Card from './components/card';
import { PiBowlFoodBold } from "react-icons/pi";
import Signup from"./pages/signup";
import LogIn from "./pages/login";
import ProtectedRoute from "./components/protectedRoute";

const App = () => {
  const recipes = [
    {
      ImageComponent: PiBowlFoodBold,
      title: 'Chicken noodle soup',
      level: { name: 'Intermediate', color: 'orange' },
      time: 25,
      calories: 95,
      type: { name: 'Meat', icon: '🍖' },
      rating: 4,
    },
    {
      ImageComponent: PiBowlFoodBold,
      title: 'Tuna Salad',
      level: { name: 'Advanced', color: 'red' },
      time: 15,
      calories: 83,
      type: { name: 'Fish', icon: '🐟' },
      rating: 5,
    },
    {
      ImageComponent: PiBowlFoodBold,
      title: 'Vege Pasta',
      level: { name: 'Beginner', color: 'green' },
      time: 35,
      calories: 105,
      type: { name: 'Vege', icon: '🥗' },
      rating: 3,
    },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute 
              element={
                <MainLayout>
                  <main className="p-4 pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe, index) => (
                      <Card key={index} {...recipe} />
                    ))}
                  </main>
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
