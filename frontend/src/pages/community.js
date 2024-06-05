import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import Card from '../components/card';
import { db } from '../components/firebase';
const Community = () => {
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

  return (
    <main className="p-4 pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <Card key={recipe.id} {...recipe} />
      ))}
    </main>
  );
};

export default Community;
