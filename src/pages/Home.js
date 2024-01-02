// src/pages/Home.js
import React from 'react';
import { Container, List, ListItem, ListItemText } from '@mui/material';
import Navbar from '../components/Navbar';
import MainHeader from '../components/MainHeader';
import IMG_6469 from '../components/IMG_6469.jpeg';

const Home = () => {
  // Dummy data for the list of recipes
  const recipes = ['Recipe 1', 'Recipe 2', 'Recipe 3'];

  return (
    <div>
      <Navbar />

      {/* Content Section */}
      <Container>
        <MainHeader title="Home Page" imageUrl= {IMG_6469} />

        <p>hello! hope you enjoy your stay</p>

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
