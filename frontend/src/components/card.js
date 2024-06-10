import React, { useState, useEffect } from 'react';
import { PiBowlFoodBold } from 'react-icons/pi'; 
import filledheart from '../assets/filledheart.png';
import heart from '../assets/heart.png';
import { db, auth } from '../components/firebase';
import bin from '../assets/bin.png';
import { doc, setDoc, deleteDoc, getDocs, collection, query, where } from 'firebase/firestore';

const Card = ({ title, level, time, calories, type, rating }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [docId, setDocId] = useState(null);

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
      try {
        const user = auth.currentUser;
        if (user) {
          const q = query(collection(db, 'users', user.uid, 'recipes'), where("title", "==", title));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const document = querySnapshot.docs[0];
            setDocId(document.id);
            console.log('Fetched document ID:', document.id);
          }
        }
      } catch (error) {
        console.error('Error fetching document ID:', error);
      }
    };

    fetchDocId();
  }, [title]);

  const handleDeleteClick = async (event) => {
    event.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      console.error('No user is signed in');
      return;
    }
    if (!docId) {
      console.error('Document ID not found');
      return;
    }

    const docRef = doc(db, 'users', user.uid, 'recipes', docId);
    console.log('Attempting to delete document at path:', docRef.path);

    try {
      await deleteDoc(docRef);
      console.log('Recipe removed successfully', docRef.path);
    } catch (error) {
      console.error('Error removing recipe:', error);
    }
  };

  const handleFavouriteClick = async (event) => {
    event.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      console.error('No user is signed in');
      return;
    }

    const favDoc = doc(db, 'users', user.uid, 'favourites', title);
    console.log('Attempting to modify favourite at path:', favDoc.path);

    try {
      if (isFavourite) {
        await deleteDoc(favDoc);
        console.log('Favorite removed successfully', favDoc.path);
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
        console.log('Favorite saved successfully', favDoc.path);
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

export default Card;
