// firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "apiKey": "AIzaSyAVtMC8JcPeJoOswv75WG-McmuphcxwG9U",
  "authDomain": "learning-harbour.firebaseapp.com",
  "projectId": "learning-harbour",
  "storageBucket": "learning-harbour.firebasestorage.app",
  "messagingSenderId": "856460327961",
  "appId": "1:856460327961:web:a9a3599673397aacf1be88",
  "measurementId": "G-VLTN0EDVCX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
