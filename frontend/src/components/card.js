import React from 'react';
import { PiBowlFoodBold } from 'react-icons/pi'; // Example import for a default icon

const Card = ({ title, level, time, calories, type, rating }) => {
  const defaultIcon = <PiBowlFoodBold className="w-16 h-16" />; // Default icon component

  const typeIcons = {
    Meat: '🍖',
    Fish: '🐟',
    Vege: '🥗',
    Matcha: '🍵',
    Chocolate: '🍫',
    Strawberry: '🍓',
    default: '🍲'
    
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
      <div className="w-16 h-16 mb-4">
        {defaultIcon}
      </div>
      <h2 className="text-xl font-bold text-center mb-2">{title}</h2>
      <p className="text-gray-600 text-center">{level}</p>
      <div className="flex justify-between my-2 w-full px-4">
        <span>{time} Min</span>
        <span>{calories} Kcal</span>
        <span className="text-2xl">
          {typeIcons[type] || typeIcons.default}
        </span>
      </div>
      <div className="flex justify-center mt-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? 'text-red-500' : 'text-gray-400'}>★</span>
        ))}
      </div>
      <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full">Start cooking</button>
    </div>
  );
};

export default Card;
