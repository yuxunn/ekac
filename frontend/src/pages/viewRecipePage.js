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
  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const {
        title,
        level,
        time,
        calories,
        type,
        rating,
        description,
        recId,
        imageUrl,
        ingredients,
      } = location.state;
      setTitle(title);
      setLevel(level);
      setTime(time);
      setRecId(recId);
      setCalories(calories);
      setType(type);
      setIngredients(ingredients);
      setRating(rating);
      console.log(ingredients);
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
              style={{ width: "500px", height: "1000px", objectFit: "cover" }}
            />
          )}
        </div>
        <div className="flex flex-col ">
          <h1 className="text-2xl font-bold mb-2">Title: {title}</h1>
          <p className="text-lg mb-2">Level: {level}</p>
          <p className="text-lg mb-2">Time: {time} minutes</p>
          <p className="text-lg mb-2">Calories: {calories}</p>
          <div className="text-lg mb-2">
            {ingredients && ingredients.length > 0 && (
          <div className="my-4">
  
            <table className="min-w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Ingredient</th>
                  <th className="border border-gray-300 p-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((ingredient, index) => (
                  <tr key={index} className="border-b">
                    <td className="border-r border-gray-300 p-2">{ingredient.name}</td>
                    <td className="p-2">{ingredient.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
          </div>
          <h2 className="text-xl font-semibold mb-2 ">Description:</h2>
          <p className="text-gray-700 whitespace-pre-line break-words">{description}</p>
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < rating ? "text-red-500" : "text-gray-400"}
              >
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
