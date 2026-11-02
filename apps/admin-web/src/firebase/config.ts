import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '[REDACTED]',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '[REDACTED]',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '[REDACTED]',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '[REDACTED]',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '[REDACTED]',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '[REDACTED]',
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
