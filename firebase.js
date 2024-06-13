// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkYhy83P0xEiNB2wcjpOK2G8mfg-mmqrY",
  authDomain: "scp-database-7d482.firebaseapp.com",
  projectId: "scp-database-7d482",
  storageBucket: "scp-database-7d482.appspot.com",
  messagingSenderId: "120927224584",
  appId: "1:120927224584:web:d67b9014a9f154873ee2bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);