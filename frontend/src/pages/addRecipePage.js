import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../components/firebase'; // Ensure correct import of db and auth
import Navbar from '../components/navbar';
const AddRecipePage = () => {
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('');
  const [time, setTime] = useState('');
  const [calories, setCalories] = useState('');
  const [type, setType] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = auth.currentUser;

      if (user) {
        // Add recipe to user's collection
        const userRecipeRef = doc(collection(db, 'users', user.uid, 'recipes'));
        await setDoc(userRecipeRef, {
          title,
          level,
          time,
          calories,
          type,
          rating,
          description,
          userId: user.uid,
          createdAt: new Date()
        });

        // Add recipe to global collection
        const globalRecipeRef = doc(collection(db, 'recipes'));
        await setDoc(globalRecipeRef, {
          title,
          level,
          time,
          calories,
          type,
          rating,
          description,
          userId: user.uid,
          createdAt: new Date()
        });

        console.log('Recipe added successfully');
        navigate('/home'); // Redirect to home after successful submission
      } else {
        console.log('User is not authenticated');
      }
    } catch (error) {
      console.log('Error adding recipe: ', error.message);
    }
  };

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 to-blue-300 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Recipe Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Recipe Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
              Level
            </label>
            <input
              type="text"
              id="level"
              placeholder="Level (e.g., Beginner, Intermediate, Advanced)"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                Time (in minutes)
              </label>
              <input
                type="number"
                id="time"
                placeholder="Time (in minutes)"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="calories">
                Calories
              </label>
              <input
                type="number"
                id="calories"
                placeholder="Calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
              Type
            </label>
            <input
              type="text"
              id="type"
              placeholder="Type (e.g., Meat, Fish, Vege)"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
              Rating (1-5)
            </label>
            <input
              type="number"
              id="rating"
              placeholder="Rating (1-5)"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Write a detailed description of the recipe..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-lg h-32"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-blue-400 text-white rounded-lg hover:from-blue-400 hover:to-pink-500"
          >
            Add Recipe
          </button>
        </form>
      </div>

    </div>
  );
};

export default AddRecipePage;
