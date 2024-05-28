import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/mainlayout'; // Import MainLayout
import Card from './components/card';
import LogIn from './pages/login';
import { PiBowlFoodBold } from "react-icons/pi";
import './tailwind.css';

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
        <Route path='/' element={<LogIn />} />
        <Route path="/home" element={
          <MainLayout>
            <main className="p-4 pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe, index) => (
                <Card key={index} {...recipe} />
              ))}
            </main>
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
};

export default App;
