import React, { useState } from 'react';
import strawberrycake from '../assets/strawberrycake.png';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../components/firebase';
import googleLogo from "../assets/google.png";
import Loading2 from '../animations/loading2';
import Modal from '../components/modal'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsButtonDisabled(e.target.value === '' || password === '');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsButtonDisabled(e.target.value === '' || email === '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) { 
        const sessionKey = await user.getIdToken();
        console.log("session storeage")
        sessionStorage.setItem('sessionKey', sessionKey);
        console.log("logged in successfully");
        window.location.href = "/home";
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage("Incorrect username and/or password. Please try again. 😭");
      setIsModalOpen(true);
      setIsSubmitting(false);
    }
  }

  const handleClick = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        console.log("Google signin");
        const sessionKey = await user.getIdToken();
        console.log("session storeage")
        sessionStorage.setItem('sessionKey', sessionKey);
        
        window.location.href = "/home";
      }
    } catch (error) {
      console.log("error");
      setErrorMessage("Incorrect username and/or password. Please try again. 😭");
      setIsModalOpen(true);
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setErrorMessage('');
  };

  if (isSubmitting) {
    return <Loading2/>
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 to-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-center mb-4">
          <img
            className="w-12 h-12 mb-2 mr-2"
            src={strawberrycake}
            alt="Logo"
          />
          <h1 className="text-2xl mb-2 font-bold">ekac</h1>
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
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="text-right">
            <Link to="/forgot-password" className="text-blue-500">Forget Password</Link>
          </div>
          <button
            type="submit"
            disabled={isButtonDisabled || isSubmitting}
            className={`w-full py-2 bg-gradient-to-r from-pink-500 to-blue-400 text-white rounded ${isButtonDisabled || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gradient-to-l'}`}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
          <div className="mt-4 text-center text-gray-600">
            Don't have an account? <Link to="/signup" className="text-blue-500">Sign up here</Link>.
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
            alt="Google sign-in"
            className="mr-2 w-10 h-8 object-contain"
          />
          Login with Google
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleCloseModal}
        title="Login Error"
        message={errorMessage}
        showCancelButton={false}
      />
    </div>
  );
}

export default Login;
