import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGzd_XvHVWDPd_RaDI_eN-95PBau5JPqY",
  authDomain: "nrfitness2-27a91.firebaseapp.com",
  projectId: "nrfitness2-27a91",
  storageBucket: "nrfitness2-27a91.firebasestorage.app",
  messagingSenderId: "1043077584185",
  appId: "1:1043077584185:web:9348478a72bf970a7a04e8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const googleProvider =
  new GoogleAuthProvider();

export default app;