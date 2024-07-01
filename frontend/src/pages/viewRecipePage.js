import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../components/firebase";

const ViewRecipePage = () => {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [time, setTime] = useState("");
  const [calories, setCalories] = useState("");
  const [type, setType] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [recId, setRecId] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { title, level, time, calories, type, rating, description, recId, imageUrl } = location.state;
      setTitle(title);
      setLevel(level);
      setTime(time);
      setRecId(recId);
      setCalories(calories);
      setType(type);
      setRating(rating);
      setDescription(description || "");
      setImage(imageUrl);
    }
  }, [location.state]);

  const handleBackButton = async (event) => {
    event.preventDefault();
    try {
      window.location.href = "/home";
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 to-blue-300 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl mx-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center mb-4 md:mb-0">
          {image && (
            <img
              src={image}
              alt="Recipe"
              className="rounded-lg w-full h-full object-cover"

              style={{ width: '300px', height: '300px', objectFit: 'cover' }}
            />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-2">Title: {title}</h1>
          <p className="text-lg mb-2">Level: {level}</p>
          <p className="text-lg mb-2">Time: {time} minutes</p>
          <p className="text-lg mb-2">Calories: {calories}</p>
          <h2 className="text-xl font-semibold mb-2">Description:</h2>
          <p className="text-gray-700 whitespace-pre-line mb-4">{description}</p>
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < rating ? "text-red-500" : "text-gray-400"}>
                ★
              </span>
            ))}
          </div>
          <button
            onClick={handleBackButton}
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-blue-400 text-white rounded hover:bg-gradient-to-l"
          >
            Return to Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewRecipePage;
