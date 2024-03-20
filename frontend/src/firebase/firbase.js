// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "yowale-blog-fa942.firebaseapp.com",
  projectId: "yowale-blog-fa942",
  storageBucket: "yowale-blog-fa942.appspot.com",
  messagingSenderId: "721007198882",
  appId: "1:721007198882:web:99aa9a942e9c3e9d078dfb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;