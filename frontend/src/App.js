import React from 'react';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Card from './components/card';
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
      type: { name: 'Meat', icon: '🍖' }, // Replace with actual icon
      rating: 4,
    },
    {
      ImageComponent: PiBowlFoodBold,
      title: 'Tuna Salad',
      level: { name: 'Advanced', color: 'red' },
      time: 15,
      calories: 83,
      type: { name: 'Fish', icon: '🐟' }, // Replace with actual icon
      rating: 5,
    },
    {
      ImageComponent: PiBowlFoodBold,
      title: 'Vege Pasta',
      level: { name: 'Beginner', color: 'green' },
      time: 35,
      calories: 105,
      type: { name: 'Vege', icon: '🥗' }, // Replace with actual icon
      rating: 3,
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-pink-100 min-h-screen">
        <Navbar />
        <main className="p-4 pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <Card key={index} {...recipe} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default App;
