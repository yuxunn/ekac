import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../components/firebase';
import filledheart from '../assets/filledheart.png';
import heart from '../assets/heart.png';
import bin from '../assets/bin.png';
import pen from '../assets/pen.png';

import { PiBowlFoodBold } from 'react-icons/pi'; 

const CardFav = ({ title, level, time, calories, type, rating, isFavourited, recId }) => {
  const [isFavourite, setIsFavourite] = useState(isFavourited);
  const [docId, setDocId] = useState(null);
  const navigate = useNavigate();

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
    const fetchDocId = async () => {
      const user = auth.currentUser;
      if (user && title) { 
        const favDocRef = doc(db, 'users', user.uid, 'favourites', title);
        const docSnap = await getDoc(favDocRef);
        if (docSnap.exists()) {
          setDocId(docSnap.id);
          setIsFavourite(true);
        } else {
          setIsFavourite(false);
        }
      }
    };

    fetchDocId();
  }, [title]);

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    const user = auth.currentUser;
    if (!user || !docId) {
      console.error('No user is signed in or document ID not found');
      return;
    }

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'recipes', docId));
      console.log('Recipe removed successfully');
    } catch (error) {
      console.error('Error removing recipe:', error);
    }
  };

  const handleEditClick = () => {
    console.log(recId)
    navigate('/editRecipe', { state: { title, level, time, calories, type, rating, recId } });
  };

  const handleFavouriteClick = async (event) => {
    event.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      console.error('No user is signed in');
      return;
    }

    const favDoc = doc(db, 'users', user.uid, 'favourites', title);
    try {
      if (isFavourite) {
        await deleteDoc(favDoc);
        console.log('Favorite removed successfully');
      } else {
        const favouriteData = {
          title,
          level,
          time,
          calories,
          type,
          rating,
        };
        await setDoc(favDoc, favouriteData);
        console.log('Favorite saved successfully');
      }
      setIsFavourite(!isFavourite);
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center relative">
      <div className="absolute top-2 left-2 flex items-center">
        <button className="toolbar-button mr-2" onClick={handleDeleteClick}>
          <img 
            alt="delete"
            className="delete"
            src={bin}
            style={{ width: '24px', height: '24px' }} 
          />
        </button>
        <button className="toolbar-button" onClick={handleFavouriteClick}>
          <img 
            alt="favourite"
            className="favourite"
            src={isFavourite ? filledheart : heart}
            style={{ width: '24px', height: '24px' }} 
          />
        </button>
        <button className="toolbar-button ml-2" onClick={handleEditClick}>
          <img 
            alt="edit"
            className = "edit"
            src= {pen}
            style={{width:'24px', height:'24px'}}
            />
        </button>
      </div>
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

export default CardFav;
