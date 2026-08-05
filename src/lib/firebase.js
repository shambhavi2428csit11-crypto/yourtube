// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKbSNqyW2OVaMIWKOc_dVSeRfJykJVhTg",
  authDomain: "yourtube-7b88c.firebaseapp.com",
  projectId: "yourtube-7b88c",
  storageBucket: "yourtube-7b88c.firebasestorage.app",
  messagingSenderId: "283406025312",
  appId: "1:283406025312:web:05ed74c8a66a4516747905",
  measurementId: "G-L6D9NKGLM3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };