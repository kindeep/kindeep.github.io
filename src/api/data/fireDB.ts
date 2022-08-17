import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// TODO: move this to env file
const firebaseConfig = {
  apiKey: "AIzaSyBfZzkJ4e7ckAguqHsW-jw5G8dL_xZjchs",
  authDomain: "kindeep-me.firebaseapp.com",
  databaseURL: "https://kindeep-me.firebaseio.com",
  projectId: "kindeep-me",
  storageBucket: "kindeep-me.appspot.com",
  messagingSenderId: "75554156675",
  appId: "1:75554156675:web:39ec6afedae6e58bd62bb6",
  measurementId: "G-3L0Z29VLS6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
