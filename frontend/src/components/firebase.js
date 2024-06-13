import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDiIi1_BCwVca46Hg_A14xRE7crdYB0JUQ",
  authDomain: "ekac-437bc.firebaseapp.com",
  projectId: "ekac-437bc",
  storageBucket: "ekac-437bc.appspot.com",
  messagingSenderId: "536462735622",
  appId: "1:536462735622:web:28d4d5afb86df56a1ac687"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider();

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Persistence set to LOCAL');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });


export  {auth, provider, db};
export default app;
 