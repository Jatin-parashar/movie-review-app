import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0LBPjqlQo-aGewTHwkjf5RaY8RFIKr-Q",
  authDomain: "movie-review-app-447d8.firebaseapp.com",
  projectId: "movie-review-app-447d8",
  storageBucket: "movie-review-app-447d8.appspot.com",
  messagingSenderId: "874045833260",
  appId: "1:874045833260:web:bf2ea6e298342644bb1189"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
