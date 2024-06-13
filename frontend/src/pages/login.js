import React, { useState } from 'react';
import strawberrycake from '../assets/strawberrycake.png';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth , provider} from '../components/firebase';
import googleLogo from "../assets/google.png";

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

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google signin");
      window.location.href = "/home";

    } catch (error) {
      console.log("error");
      alert("failed to login TT");
    }
  };
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-blue-400 text-white rounded hover:bg-gradient-to-l"
          >
            Log In
          </button>
          <button
            onClick={handleClick}
            className=" mt-3 w-full flex justify-center items-center bg-white hover:bg-gray-100 text-gray-800 font-normal py-2 px-4 rounded shadow"
          >
            <img
              src={googleLogo}
              alt="Google sign-in"
              className="mr-2 w-10 h-8 object-fit:contain"
            />
            Login with Google
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
