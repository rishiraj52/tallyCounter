import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7PuqVH_3O516vekdl3IZLYU9Y9AnJc7M",
  authDomain: "tallycounter-f19da.firebaseapp.com",
  projectId: "tallycounter-f19da",
  storageBucket: "tallycounter-f19da.appspot.com",
  messagingSenderId: "359514614861",
  appId: "1:359514614861:web:26ff29b8929833a736c004",
  measurementId: "G-WV44D1746C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
