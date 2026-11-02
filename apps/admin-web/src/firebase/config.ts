import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDPD4xnKiJwkjltQ5lZHWktoO7GY73Ovb4",
  authDomain: "mani-saas.firebaseapp.com",
  projectId: "mani-saas",
  storageBucket: "mani-saas.firebasestorage.app",
  messagingSenderId: "4581951359",
  appId: "1:4581951359:web:fb06699e39dd217e04fc4a",
  measurementId: "G-X0FHV81MPF",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

auth = getAuth(app);
db = getFirestore(app);
storage = getStorage(app);

export { app, auth, db, storage };
export default { app, auth, db, storage };
