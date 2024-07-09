import React from 'react';

const EventCard = ({ image, title, date, location, price, link }) => {
  return (
    <div className="bg-white h-40 p-4 rounded-lg shadow flex">
      <img src={image} alt={title} className="w-1/3 h-full object-cover rounded-lg" />
      <div className="ml-4 flex-1 overflow-hidden">
        <h3 className="text-xl font-semibold truncate">{title}</h3>
        <p className="mt-2 text-gray-600 truncate">{date}</p>
        <p className="mt-2 text-gray-600 truncate">{location}</p>
        <p className="mt-2 text-gray-600 truncate">{price}</p>
        <a href={link} className="mt-4 inline-block text-blue-500 truncate">Learn More</a>
      </div>
    </div>
  );
}

export default EventCard;
