import React, { useState, useEffect } from 'react';
import { PiBowlFoodBold } from 'react-icons/pi'; 
import filledheart from '../assets/filledheart.png';
import heart from '../assets/heart.png';
import { db, auth } from '../components/firebase';
import { doc, setDoc, deleteDoc, getDocs, collection } from 'firebase/firestore';

const Card = ({ title, level, time, calories, type, rating }) => {
  const [isFavorite, setIsFavorite] = useState(false); 

  const defaultIcon = <PiBowlFoodBold className="w-16 h-16" />; 

  const typeIcons = {
    Meat: '🍖',
    Fish: '🐟',
    Vege: '🥗',
    Matcha: '🍵',
    Chocolate: '🍫',
    Strawberry: '🍓',
    default: '🍲'
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const favCollection = collection(db, 'users', user.uid, 'favorites');
          const favSnapshot = await getDocs(favCollection);
          const favList = favSnapshot.docs.map(doc => doc.id);

          if (favList.includes(title)) {
            setIsFavorite(true);
          }
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [title]);

  const handleFavouriteClick = async (event) => {
    event.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      console.error('No user is signed in');
      return;
    }

    const favDoc = doc(db, 'users', user.uid, 'favorites', title);

    try {
      if (isFavorite) {
        // Remove from favorites
        await deleteDoc(favDoc);
        console.log('Favorite removed successfully');
      } else {
        // Add to favorites
        const favoriteData = {
          title,
          level,
          time,
          calories,
          type,
          rating,
        };
        await setDoc(favDoc, favoriteData);
        console.log('Favorite saved successfully');
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
      <div className="w-16 h-16 mb-4">
        {defaultIcon}
      </div>
      <div className="flex justify-between w-full px-4">
        <h2 className="text-xl font-bold text-center mb-2">{title}</h2>
        <button className="toolbar-button" onClick={handleFavouriteClick}>
          <img 
            alt="favourite"
            className="favourite"
            src={isFavorite ? filledheart : heart}
            style={{ width: '24px', height: '24px' }} 
          />
        </button>
      </div>
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
