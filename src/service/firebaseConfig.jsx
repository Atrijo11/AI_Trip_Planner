// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClYP55N0czLy_iFQT80MFT-au1KoojMto",
  authDomain: "ai-travpl-authen.firebaseapp.com",
  projectId: "ai-travpl-authen",
  storageBucket: "ai-travpl-authen.firebasestorage.app",
  messagingSenderId: "321082616268",
  appId: "1:321082616268:web:8d43cb133bdfe7bde11569"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
export { app, db };




// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCykAvjW4PRlh7okwtSCbbEgPKXv6wvthY",
//   authDomain: "ai-trip-planner-514ea.firebaseapp.com",
//   projectId: "ai-trip-planner-514ea",
//   storageBucket: "ai-trip-planner-514ea.firebasestorage.app",
//   messagingSenderId: "165953989389",
//   appId: "1:165953989389:web:4a25f8b8853bbfb61d9e44",
//   measurementId: "G-S15D6NGY17"
// };

// // Check if Firebase is already initialized, if not, initialize it
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore(app);

// export { app, db };