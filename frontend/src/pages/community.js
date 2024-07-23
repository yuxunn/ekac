import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import CardFav from '../components/cardfav';
import { db } from '../components/firebase';

const recipeTypes = {
  Meat: '🍖',
  Fish: '🐟',
  Vege: '🥗',
  Matcha: '🍵',
  Chocolate: '🍫',
  Strawberry: '🍓',
  default: '🍲'
};

const Community = ({ filter }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = () => {
      const q = query(collection(db, 'recipes'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const recipesData = [];
        querySnapshot.forEach((doc) => {
          recipesData.push({ id: doc.id, ...doc.data() });
        });
        setRecipes(recipesData);
      });

      return () => unsubscribe();
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter(recipe => {
    if (filter === "None" || !filter) {
      return true;
    }
    if (filter === "DateCreated") {
      return true; 
    }
    return recipe.type === filter;
  });

  return (
    <main className="p-4 pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <CardFav key={recipe.id} {...recipe} />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-600">
          No recipes found 😭
        </div>
      )}
    </main>
  );
};

export default Community;
