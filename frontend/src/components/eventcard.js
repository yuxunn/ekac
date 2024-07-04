import React from 'react';

const EventCard = ({ image, title, date, location, price, link }) => {
  return (
    <div className="bg-white h-48 p-4 rounded-lg shadow flex items-center">
      <img src={image} alt={title} className="w-1/3 h-full object-cover rounded-lg" />
      <div className="ml-4 flex-1">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-gray-600">{date}</p>
        <p className="mt-2 text-gray-600">{location}</p>
        <p className="mt-2 text-gray-600">{price}</p>
        <a href={link} className="mt-4 inline-block text-blue-500">Learn More</a>
      </div>
    </div>
  );
}

export default EventCard;
