// src/pages/Home.js
import React from 'react';
import { Container, List, ListItem, ListItemText } from '@mui/material';
import Navbar from '../components/Navbar';

const Home = () => {
  // Dummy data for the list of recipes
  const recipes = ['Recipe 1', 'Recipe 2', 'Recipe 3'];

  return (
    <div>
      <Navbar />

      {/* Content Section */}
      <Container>
        <h1>Home Page</h1>
        <p>Welcome to the Home page!</p>

        {/* List of Recipes */}
        <List>
          {recipes.map((recipe, index) => (
            <ListItem key={index}>
              <ListItemText primary={recipe} />
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default Home;
