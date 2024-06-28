import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../components/firebase";
import { useNavigate, useLocation } from "react-router-dom";

const ViewRecipePage = () => {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [time, setTime] = useState("");
  const [calories, setCalories] = useState("");
  const [type, setType] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [recId, setRecId] = useState("");
  const [image, setImage] = useState("")

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { title, level, time, calories, type, rating, description, recId, imageUrl } = location.state;
      console.log(location.state);
      console.log(imageUrl)
      setTitle(title);
      setLevel(level);
      setTime(time);
      console.log(recId);
      setRecId(recId);
      console.log(recId);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 to-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-center mb-4"></div>
        <div className="flex justify-center mb-4">
          {image && (
            <img
              src={image}
              alt="Recipe"
              className="w-full h-auto rounded-lg"
              style={{ width: '300px', height: '300px', objectFit: 'cover' }}
            />
          )}
        </div>
        <div className="flex flex-col items-center">
          <p>Title: {title}</p>
          <p>Time: {time} </p>
          <p>Description: {description}</p>
          <p>Calories: {calories} </p>
          <div className="flex justify-center mt-4">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < rating ? "text-red-500" : "text-gray-400"}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={handleBackButton}
          className="w-full py-2 mt-4 bg-gradient-to-r from-pink-500 to-blue-400 text-white rounded hover:bg-gradient-to-l"
        >
          Return to Home Page
        </button>
      </div>
    </div>
  );
};

export default ViewRecipePage;
