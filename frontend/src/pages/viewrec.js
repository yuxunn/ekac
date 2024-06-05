import React from "react";
import { Link } from "react-router-dom";

const recipes = [
    { id: 1, name: "Chicken noodle soup", level: "Intermediate", time: 25, kcal: 95, type: "Meat", rating: 4.5 },
    { id: 2, name: "Tuna Salad", level: "Advanced", time: 15, kcal: 83, type: "Fish", rating: 5 },
    { id: 3, name: "Vege Pasta", level: "Beginner", time: 35, kcal: 105, type: "Vege", rating: 3 },
];

const ViewRec = () => {
    return (
        <div>
            {recipes.map(recipe => (
                <div key={recipe.id} className="recipe-card">
                    <h2>{recipe.name}</h2>
                    <p>{recipe.level}</p>
                    <p>{recipe.time} Min</p>
                    <p>{recipe.kcal} Kcal</p>
                    <p>{recipe.type}</p>
                    <p>{recipe.rating} Stars</p>
                    <Link to={`/recipe/${recipe.id}`}>
                        <button>Start cooking</button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ViewRec;
