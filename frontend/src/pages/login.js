import React, { useState } from 'react';
import strawberrycake from '../assets/strawberrycake.png';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../components/firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("logged in successfully");
      window.location.href = "/home";
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 to-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-md mx-4">
        <div className="flex items-center justify-center md:w-1/3">
          <img 
            className="w-12 h-12 mb-4"
            src={strawberrycake}
            alt="Logo"
          />
        </div>
        <form onSubmit={handleSubmit} className="md:w-2/3">
          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.test.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-blue-400 text-white rounded hover:bg-gradient-to-l"
          >
            Log In
          </button>
          <div className="mt-4 text-center text-gray-600">
            Don't have an account? <Link to="/signup" className="text-blue-500">Sign up here</Link>.
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
