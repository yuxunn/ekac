import React, { useEffect, useState, useContext } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../components/firebase'; 
import CardFav from '../components/cardfav';
import { SearchContext } from '../components/searchContext';

const Home = ({ recipes }) => {
  const [localRecipes, setLocalRecipes] = useState([]);
  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    if (recipes) {
      setLocalRecipes(recipes);
    }
  }, [recipes]);

  const filteredRecipes = localRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="p-4 pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <CardFav key={recipe.id} isFavorited={true} {...recipe} showEditDeleteButtons={true} />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-600">
          You have not added any recipes yet! 😭 Start to add your own recipes now! 🍰
        </div>
      )}
    </main>
  );
};

export default Home;
