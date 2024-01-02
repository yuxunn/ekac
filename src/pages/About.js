// src/pages/About.js
import React from 'react';
import { Link } from 'react-router-dom';


const About = () => {
  return (
    <div>
      <h1>About Page</h1>
      {/* Your about page content goes here */}
      <Link to="/">Go to home</Link>

    </div>
  );
};

export default About;
