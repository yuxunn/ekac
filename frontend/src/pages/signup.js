import React, { useState } from 'react';
import strawberrycake from '../assets/strawberrycake.png';
import { Link } from 'react-router-dom';
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, provider } from "../components/firebase";
import Loading2 from '../animations/loading2';

import finn from "../assets/finn-the-human-duotone-svgrepo-com.svg"
import googleLogo from "../assets/google.png";

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    checkFields(e.target.value, password, confirmPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkFields(email, e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    checkFields(email, password, e.target.value);
  };

  const checkFields = (email, password, confirmPassword) => {
    if (email && password && confirmPassword && password === confirmPassword) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email === "" || password === "" || username === "") {
      alert("Please fill in all fields");
      return;
    } else if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setIsSubmitting(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          username: username, 
          avatar: finn
        });
        
        const sessionKey = await user.getIdToken();
        sessionStorage.setItem('sessionKey', sessionKey);

        console.log("User registered successfully.");
        console.log("User data saved to Firestore.");
        window.location.href = "/home";
      }
    } catch (error) {
      console.log(error.message);
      setIsSubmitting(false);
    }
  };

  const handleClick = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        const sessionKey = await user.getIdToken();
        sessionStorage.setItem('sessionKey', sessionKey);

        console.log("Google signup");
        window.location.href = "/home";
      }
    } catch (error) {
      console.log("error");
      alert("Failed to signup TT");
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <Loading2/>
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 to-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-center mb-4">
          <img
            className="w-12 h-12 mr-2"
            src={strawberrycake}
            alt="Logo"
          />
          <h1 className="text-2xl font-bold">ekac</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="username"
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
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            disabled={isButtonDisabled || isSubmitting}
            className={`w-full py-2 bg-gradient-to-r from-pink-500 to-blue-400 text-white rounded ${isButtonDisabled || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gradient-to-l'}`}
          >
            {isSubmitting ? 'Signing up...' : 'Signup'}
          </button>
          <div className="mt-4 text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-500">Log in here</Link>.
          </div>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <button
          onClick={handleClick}
          disabled={isSubmitting}
          className="w-full flex justify-center items-center bg-white hover:bg-gray-100 text-gray-800 font-normal py-2 px-4 rounded shadow"
        >
          <img
            src={googleLogo}
            alt="Google signup"
            className="mr-2 w-10 h-8 object-contain"
          />
          Signup with Google
        </button>
      </div>
    </div>
  );
}

export default Signup;
