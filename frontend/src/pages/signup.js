import React, { useState } from "react";
import strawberrycake from "../assets/strawberrycake.png";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../components/firebase";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import googleLogo from "../assets/google.png";
import finn from "../assets/finn-the-human-duotone-svgrepo-com.svg"
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google sign-in successful. User:", user);

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: user.displayName,
      });
      window.location.href = "/login";
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      alert("Failed to sign in with Google. Please try again.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email === "" || password === "" || username === "") {
      alert("Please fill in all fields");
      return;
    } else if (password !== secondPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      console.log("User registered successfully.");
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          username: username, 
          avatar: finn
        });
      }
      console.log("User data saved to Firestore.");
      window.location.href = "/login";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 to-blue-300">
      <div
        style={{
          backgroundColor: "white",
          padding: "16px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          width: "90%",
          maxWidth: "500px",
          margin: "auto",
        }}
        className="flex flex-col w-full mx-4"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img className="w-16 h-16 mb-4" src={strawberrycake} alt="Logo" />
        </div>
        <form onSubmit={handleSubmit} className="md: w-full">
          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
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
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-blue-400 text-white rounded hover:from-blue-400 hover:to-pink-500"
          >
            Sign Up
          </button>
          <button
            onClick={handleClick}
            className=" mt-3 w-full flex justify-center items-center bg-white hover:bg-gray-100 text-gray-800 font-normal py-2 px-4 rounded shadow"
          >
            <img
              src={googleLogo}
              alt="Google sign-in"
              className="mr-2 w-10 h-10 object-fit:contain"
            />
            Sign up with Google
          </button>

          <div className="mt-4 text-center text-gray-600">
            Already have an account? Log In{" "}
            <Link to="/login" className="text-blue-500">
              here
            </Link>
            .
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
