// src/components/PageTitle.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const MainHeader = ({ title, imageUrl }) => {
  const containerStyle = {
    position: 'relative',
    textAlign: 'center',
    color: 'black', // Set text color to black
    backgroundColor: 'white', // Set background color to white
    padding: '50px', // Adjust padding as needed
  };

  const titleStyle = {
    fontFamily: 'Arial, sans-serif', // Change font family
    fontSize: '3rem', // Adjust font size
    fontWeight: 'bold', // Set font weight to bold
    marginBottom: '20px', // Add some space between title and image
  };

  const imageStyle = {
    width: '100px', // Adjust image width
    marginBottom: '10px', 
    borderRadius: '%', // Apply border-radius for a circular shape
    objectFit: 'cover', // Ensure the entire image is visible within the circular shape// Add some space between image and title
  };

  return (
    <Box style={containerStyle}>
      {imageUrl && <img src={imageUrl} alt="Page Logo" style={imageStyle} />}
      <Typography variant="h1" component="h1" gutterBottom style={titleStyle}>
        {title}
      </Typography>
    </Box>
  );
};

export default MainHeader;

