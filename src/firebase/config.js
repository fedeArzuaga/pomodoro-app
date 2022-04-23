// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4Z1EoyrjPDgiTYGydvBf8PoWkt-uCj5k",
  authDomain: "pomodoroapp-cfece.firebaseapp.com",
  projectId: "pomodoroapp-cfece",
  storageBucket: "pomodoroapp-cfece.appspot.com",
  messagingSenderId: "1044078066584",
  appId: "1:1044078066584:web:b98d150cccd811064009ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  app,
  db
}