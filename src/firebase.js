import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7U2sHUn6WzS1sWVG1ZJ_JgFeN-Povwh8",
  authDomain: "nrfitness-b87b2.firebaseapp.com",
  databaseURL: "https://nrfitness-b87b2-default-rtdb.firebaseio.com",
  projectId: "nrfitness-b87b2",
  storageBucket: "nrfitness-b87b2.firebasestorage.app",
  messagingSenderId: "808943460317",
  appId: "1:808943460317:web:eeb7bfe2764b51321c6034",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();

export default app;