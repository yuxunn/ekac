import React, { useEffect, useState, useContext } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../components/firebase'; 
import CardFav from '../components/cardfav';
import { SearchContext } from '../components/searchContext';

const Favourites = ({ recipes, filter }) => {
  const [allRecipes, setAllRecipes] = useState([]);
  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    const fetchRecipes = () => {
      const user = auth.currentUser;

      if (user) {
        const q = query(collection(db, 'users', user.uid, 'favourites'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const recipesData = [];
          querySnapshot.forEach((doc) => {
            recipesData.push({ id: doc.id, ...doc.data() });
          });
          setAllRecipes(recipesData);
        });

        return () => unsubscribe();
      } else {
        console.log('User is not authenticated');
      }
    };

    fetchRecipes();
  }, []);

  // Apply the filter logic to the recipes
  const filteredRecipes = allRecipes.filter(recipe => {
    if (filter === "None" || !filter) {
      return recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (filter === "DateCreated") {
      return recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return recipe.type === filter && recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <main className="p-4 pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <CardFav key={recipe.id} isFavorited={true} {...recipe} />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-600">
        You have no favourited recipes yet! 😭 Start to ❤️ the recipes you like now!
        </div>
      )}
    </main>
  );
};

export default Favourites;
