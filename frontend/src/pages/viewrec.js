import React from "react";
import { Link } from "react-router-dom";

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
