import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import firebaseConfig from '../../firebaseConfig.json';

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { 
  database
}