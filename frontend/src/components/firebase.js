// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth from firebase/auth
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDiIi1_BCwVca46Hg_A14xRE7crdYB0JUQ",
  authDomain: "ekac-437bc.firebaseapp.com",
  projectId: "ekac-437bc",
  storageBucket: "ekac-437bc.appspot.com",
  messagingSenderId: "536462735622",
  appId: "1:536462735622:web:28d4d5afb86df56a1ac687"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 
export const db = getFirestore(app);
export default app;
 