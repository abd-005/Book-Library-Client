// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCPc6f7vLmHvU6pvzI7QChrMNv9UT2yRZM",
//   authDomain: "the-book-heaven-cb191.firebaseapp.com",
//   projectId: "the-book-heaven-cb191",
//   storageBucket: "the-book-heaven-cb191.firebasestorage.app",
//   messagingSenderId: "714735248297",
//   appId: "1:714735248297:web:d2943575fb387f1a7b1ab8"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
