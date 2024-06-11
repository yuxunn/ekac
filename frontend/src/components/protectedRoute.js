import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/firebase';

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is authenticated:', user);
        setIsAuthenticated(true);
      } else {
        console.log('User is not authenticated');
        setIsAuthenticated(false);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (isAuthenticated === null) {
    console.log('Authentication state is null, returning null');
    return null; // Prevent redirection if the state is not determined yet
  }

  return isAuthenticated ? element : null;
};

export default ProtectedRoute;
