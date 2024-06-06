import React from "react";
import { useParams } from "react-router-dom";

const Recipe = () => {
  const { id } = useParams();
  const recipes = [
    { id: 1, name: "Chicken noodle soup", level: "Intermediate", time: 25, kcal: 95, type: "Meat", rating: 4.5 },
    { id: 2, name: "Tuna Salad", level: "Advanced", time: 15, kcal: 83, type: "Fish", rating: 5 },
    { id: 3, name: "Vege Pasta", level: "Beginner", time: 35, kcal: 105, type: "Vege", rating: 3 },
  ];

  const recipe = recipes.find(r => r.id === parseInt(id));

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>Level: {recipe.level}</p>
      <p>Time: {recipe.time} Min</p>
      <p>Calories: {recipe.kcal} Kcal</p>
      <p>Type: {recipe.type}</p>
      <p>Rating: {recipe.rating} Stars</p>
    </div>
  );
};

export default Recipe;
