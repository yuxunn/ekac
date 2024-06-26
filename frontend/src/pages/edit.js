import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../components/firebase";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";

const EditPage = () => {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [time, setTime] = useState("");
  const [calories, setCalories] = useState("");
  const [type, setType] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [recId, setRecId] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
        
    const { title, level, time, calories, type, rating, description, recId } =
    location.state;

      setTitle(title);
      setLevel(level);
      setTime(time);
      console.log(recId);
      setRecId(recId);
      console.log(recId)
      setCalories(calories);
      setType(type);
      setRating(rating);
      setDescription(description || "");
    }
  }, [location.state]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = auth.currentUser;
      const userRecipeRef = doc(db, "users", user.uid, "recipes", recId);
        console.log(userRecipeRef)
      if (user) {
        const recipeData = {
          title,
          level,
          time,
          calories,
          type,
          rating,
          description,
          userId: user.uid,
          createdAt: new Date(),
          recId,
        };
        console.log(recipeData);
        await updateDoc(userRecipeRef, recipeData);
        navigate('/home')

      }
    } catch (error) {
      console.log("error updating recipe", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 to-blue-300 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="level"
            >
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
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="time"
              >
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
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="calories"
              >
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="rating"
            >
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
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
            Update Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
