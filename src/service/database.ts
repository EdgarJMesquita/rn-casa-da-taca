import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAt4Z-KPOkL3KdO7h1rAOS0DufLHI8sUrU",
  authDomain: "casa-da-taca.firebaseapp.com",
  projectId: "casa-da-taca",
  storageBucket: "casa-da-taca.appspot.com",
  messagingSenderId: "699739679072",
  appId: "1:699739679072:web:45698d480c153e31795605"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { 
  database
}