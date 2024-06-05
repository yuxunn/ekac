import React, { useState } from 'react';
import strawberrycake from '../assets/strawberrycake.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../components/firebase'; // Ensure correct import of auth
import { setDoc, doc } from 'firebase/firestore';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email === '' || password === '' || username === '') {
      alert('Please fill in all fields');
      return;
    } else if (password !== secondPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      console.log("User registered successfully.");
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          username: username, 
        });

      }
      console.log("User data saved to Firestore.");

    } catch (error) {
      console.log(error.message);
    }
  };

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
              type="email"
              id="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="Username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <input 
              type="password"
              id="secondPassword"
              placeholder="Re-enter password"
              value={secondPassword}
              onChange={(e) => setSecondPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="ml -10 w-full py-3 bg-gradient-to-r from-pink-500 to-blue-400 text-white rounded hover:from-blue-400 hover:to-pink-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
