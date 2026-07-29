import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfigJson from '../../firebase-applet-config.json';

const firebaseConfig = {
  projectId: firebaseConfigJson.projectId,
  appId: firebaseConfigJson.appId,
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
};

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific database ID if available
export const db = getFirestore(
  app,
  firebaseConfigJson.firestoreDatabaseId || '(default)'
);

export const auth = getAuth(app);
export default app;
