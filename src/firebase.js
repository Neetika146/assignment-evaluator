import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import config from "./config.json"; // Import your config file

const app = initializeApp(config);

export const auth = getAuth(app);
export const db = getFirestore(app);
