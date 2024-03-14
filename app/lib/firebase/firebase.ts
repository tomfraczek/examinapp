// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDPO3L27OhY0li2sR3aKbQQ3nnrJG8KAgQ',
  authDomain: 'examinapp-af840.firebaseapp.com',
  projectId: 'examinapp-af840',
  storageBucket: 'examinapp-af840.appspot.com',
  messagingSenderId: '885404747696',
  appId: '1:885404747696:web:0bee8d7c8efe33cb02b875',
  measurementId: 'G-B6RMB5J78Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

export const googleAuthProvider = new GoogleAuthProvider();
