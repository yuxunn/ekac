import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, increment, getDoc, deleteDoc, setDoc, getDocs , query, collection, where} from 'firebase/firestore';
import { db, auth } from '../components/firebase';
import filledheart from '../assets/filledheart.png';
import heart from '../assets/heart.png';
import bin from '../assets/bin.png';
import pen from '../assets/pen.png';
import { PiBowlFoodBold } from 'react-icons/pi'; 
import down from '../assets/down.png';
import uparrow from '../assets/uparrow.png'
import Modal from '../components/modal';

const CardFav = ({ title, level, time, calories, type, description, isFavourited, recId, imageUrl, ingredients, showEditDeleteButtons, upvotes, downvotes }) => {
  const [isFavourite, setIsFavourite] = useState(isFavourited);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          setIsFavourite(true);
        } else {
          setIsFavourite(false);
        }
      }
    };

    fetchDocId();
  }, [title]);

  const handleDeleteClick = async () => {
    const user = auth.currentUser;
    if (!user || !recId) {
      console.error('No user is signed in or document ID not found');
      return;
    }

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'recipes', recId));
      const globalRecipesQuery = query(collection(db, 'recipes'), where('title', '==', title));
      const globalRecipesSnapshot = await getDocs(globalRecipesQuery);
      const globalRecipeDocs = globalRecipesSnapshot.docs;
    
      if (globalRecipeDocs.length > 0) {
        const globalRecipeDocId = globalRecipeDocs[0].id;
        await deleteDoc(doc(db, 'recipes', globalRecipeDocId));
        console.log('Recipe removed successfully from global recipes');


        const favRef = doc(db, 'users', user.uid, 'favourites', title);
        const favDoc = await getDoc(favRef);
        if (favDoc.exists()) {
          await deleteDoc(favRef);
          console.log('Favorite removed successfully');
        }

      } else {
        console.error('No recipe with the specified title found in global recipes');
      }
      console.log('Recipe removed successfully');
    } catch (error) {
      console.error('Error removing recipe:', error);
    }
  };

  const handleEditClick = () => {
    console.log(recId)
    navigate('/editRecipe', { state: { title, level, time, calories, type, description, recId, imageUrl, ingredients } });
  };

  const handleViewClick = () => {
    console.log("recId at view", recId);
    navigate('/view', { state: { title, level, time, calories, description, type, recId, imageUrl, ingredients } });
  }

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
        console.log('Upvotes:', upvotes);
        console.log('Downvotes:', downvotes);
        setIsFavourite(true);
        console.log(isFavourite);
        const favouriteData = {
          title,
          level,
          time,
          calories,
          description,
          type,
          recId,
          imageUrl,
          ingredients,
          upvotes,
          downvotes
        };
        await setDoc(favDoc, favouriteData);
        console.log('Favorite saved successfully');
      }
      setIsFavourite(!isFavourite);
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    handleDeleteClick();
    closeModal();
  };

const handleUpvote = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error('No user is signed in');
    return;
  }

  const recipeRef = doc(db, 'users', user.uid, 'recipes', recId);
  const recipeDoc = await getDoc(recipeRef);
  const favRef2 = doc(db, 'users', user.uid, 'favourites', title);
  const favDoc2 = await getDoc(favRef2);
  if (!recipeDoc.exists()) {
    console.error('No document found to update.');
    return;
  }

  const globalRecipesQuery = query(collection(db, 'recipes'), where('title', '==', title));
  const globalRecipesSnapshot = await getDocs(globalRecipesQuery);
  const globalRecipeDocs = globalRecipesSnapshot.docs;
  
  if (globalRecipeDocs.length > 0) {
    const globalRecipeDocId = globalRecipeDocs[0].id;
    const globalRef = doc(db, 'recipes', globalRecipeDocId);
  
    await updateDoc(globalRef, {
      upvotes: increment(1)
    });
  
    console.log('Document updated successfully');
  } else {
    console.error('No recipe with the specified title found in global recipes');
  }
  

  await updateDoc(recipeRef, {
    upvotes: increment(1)
  });

  if (favDoc2.exists()) {
    await updateDoc(favRef2, {
      upvotes: increment(1)
    });
    console.log("Upvotes updated in favourites");
  }

  const updatedFavDoc = await getDoc(favRef2);
  console.log("Updated favourites document:", updatedFavDoc.data());

  console.log("Favourites document exists:", favDoc2.exists());
};


const handleDownvote = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error('No user is signed in');
    return;
  }

  const recipeRef = doc(db, 'users', user.uid, 'recipes', recId);
  const recipeDoc = await getDoc(recipeRef);

  const globalRecipesQuery = query(collection(db, 'recipes'), where('title', '==', title));
  const globalRecipesSnapshot = await getDocs(globalRecipesQuery);
  const globalRecipeDocs = globalRecipesSnapshot.docs;
  
  if (globalRecipeDocs.length > 0) {
    const globalRecipeDocId = globalRecipeDocs[0].id;
    const globalRef = doc(db, 'recipes', globalRecipeDocId);
  
    await updateDoc(globalRef, {
      downvotes: increment(1)
    });
  
    console.log('Document updated successfully');
  } else {
    console.error('No recipe with the specified title found in global recipes');
  }
  

  const favRef2 = doc(db, 'users', user.uid, 'favourites', title);
  const favDoc2 = await getDoc(favRef2);

  if (!recipeDoc.exists()) {
    console.error('No document found to update.');
    return;
  }

  await updateDoc(recipeRef, {
    downvotes: increment(1)
  });

  if (favDoc2.exists()) {
    await updateDoc(favRef2, {
      downvotes: increment(1)
    });
    console.log("Downvotes updated in favourites");
  }

  const updatedFavDoc = await getDoc(favRef2);
  console.log("Updated favourites document:", updatedFavDoc.data());

  console.log("Favourites document exists:", favDoc2.exists());
};

  const calculateRating = () => {
    const totalVotes = (upvotes || 0) + (downvotes || 0);
    if (totalVotes === 0) {
      return 3; 
    }
    const upvotePercentage = (upvotes || 0) / totalVotes;
    return Math.round(upvotePercentage * 5);
  };

  const rating = calculateRating();
  const totalVotes = (upvotes || 0) + (downvotes || 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center relative">
      <div className="absolute top-2 left-2">
        <button className="toolbar-button" onClick={handleFavouriteClick}>
          <img 
            alt="favourite"
            className="favourite"
            src={isFavourite ? filledheart : heart}
            style={{ width: '24px', height: '24px' }} 
          />
        </button>
      </div>
      <div className="absolute top-2 right-2 flex items-center">
        {showEditDeleteButtons && (
          <>
            <button className="toolbar-button ml-2" onClick={openModal}>
              <img 
                alt="delete"
                className="delete"
                src={bin}
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
          </>
        )}
      </div>
      <div className="w-16 h-16 mb-4">
        {imageUrl ? (
          <img src={imageUrl} alt="Recipe" className="w-16 h-16 object-cover rounded-full" />
        ) : (
          defaultIcon
        )}
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
      <div className="absolute bottom-4 left-8 flex flex-col items-center">
        <button onClick={handleUpvote} className="mb-2">
          <img 
            alt="up"
            className="up"
            src={uparrow}
            style={{ width: '24px', height: '24px' }} 
          />
        </button>
        <div className="text-gray-700 font-bold mb-2">{totalVotes}</div>
        <button onClick={handleDownvote}>
          <img 
            alt="down"
            className="down"
            src={down}
            style={{ width: '24px', height: '24px' }} 
          />
        </button>
      </div>
      <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full" onClick={handleViewClick}>Start cooking</button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
      />
    </div>
  );
};

export default CardFav;
