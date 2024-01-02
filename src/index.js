// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import './index.css'; // You may have other imports here

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
