// src/pages/Home.js
import React, { useEffect, useState, useContext } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../components/firebase'; 
import Card from '../components/card';
import { SearchContext } from '../components/searchContext';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    const fetchRecipes = () => {
      const user = auth.currentUser;

      if (user) {
        const q = query(collection(db, 'users', user.uid, 'recipes'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const recipesData = [];
          querySnapshot.forEach((doc) => {
            recipesData.push({ id: doc.id, ...doc.data() });
          });
          setRecipes(recipesData);
        });

        return () => unsubscribe();
      } else {
        console.log('User is not authenticated');
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="p-4 pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRecipes.map((recipe) => (
        <Card key={recipe.id} {...recipe} />
      ))}
    </main>
  );
};

export default Home;
