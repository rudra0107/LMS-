import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig: {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
} = {
  apiKey: "AIzaSyD-7rPRgvaWN3gNtVaAxnQsLth9GWZ-0NY",
  authDomain: "online-learning-6d67d.firebaseapp.com",
  projectId: "online-learning-6d67d",
  storageBucket: "online-learning-6d67d.appspot.com",
  messagingSenderId: "278970046577",
  appId: "1:278970046577:web:a67fb26b274b377746a3d0",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = getAuth();

export const provider: GoogleAuthProvider = new GoogleAuthProvider();

export default app;
