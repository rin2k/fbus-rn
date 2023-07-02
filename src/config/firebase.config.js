// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPkJnRPU6bwI0HrNcp8HCwz111QjEEWQI",
  authDomain: "fbus-391309.firebaseapp.com",
  projectId: "fbus-391309",
  storageBucket: "fbus-391309.appspot.com",
  messagingSenderId: "737489797165",
  appId: "1:737489797165:web:2e21a114129690ec3e78a4",
  measurementId: "G-E04QG79BZ2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});
export const storage = getStorage(app);
export const functions = getFunctions(app);
