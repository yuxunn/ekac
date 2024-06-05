import React, { useState } from 'react';
import strawberrycake from '../assets/strawberrycake.png';
import {Link} from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../components/firebase';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (username === '' || password === '') {
  //     alert('Please fill in both fields');
  //     return;
  //   }
  //   console.log('Logging in with', username, password);
  //   alert('Login successful!');
  // };

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
    <div className="bg-white p-8 rounded-lg shadow-md flex w-2/3 max-w-lg">
      <div className="flex items-center justify-center w-1/3">
        <img 
          className="w-16 h-16 mr-10"
          src={strawberrycake}
          alt="Logo"
        />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-4 ">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="ml -10 w-full py-3 bg-gradient-to-r from-pink-500 to-blue-400 text-white rounded hover:from-blue-400 hover:to-pink-500"
          >
            Log In
          </button>

        </form>
       
      </div>
      <p className = "loginbottomtext">
        Don't have an account? Sign up <Link to="/signup">here</Link>.<br/>
        </p>
    </div>
  );
}

export default Login;
