import React from 'react';

const Card = ({ ImageComponent, title, level, time, calories, type, rating }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-center">
        <ImageComponent className="w-16 h-16 rounded-full -mt-12 shadow-lg" />
      </div>
      <div className="text-center mt-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className={`text-sm text-${level.color}-500`}>{level.name}</p>
      </div>
      <div className="flex justify-around text-center mt-4">
        <div>
          <p className="text-lg font-bold">{time}</p>
          <p className="text-sm text-gray-600">Min</p>
        </div>
        <div>
          <p className="text-lg font-bold">{calories}</p>
          <p className="text-sm text-gray-600">Kcal</p>
        </div>
        <div>
          <p className="text-lg font-bold">{type.icon}</p>
          <p className="text-sm text-gray-600">{type.name}</p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={`text-${i < rating ? 'red' : 'gray'}-500`}>&#9733;</span>
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded-full">Start cooking</button>
      </div>
    </div>
  );
};

export default Card;
