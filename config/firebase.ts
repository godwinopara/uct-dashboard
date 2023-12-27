// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDtp6qCdaxJDX-s14HoSQsJ2dKUt4EsBHc",
	authDomain: "cryptosphere-trade.firebaseapp.com",
	projectId: "cryptosphere-trade",
	storageBucket: "cryptosphere-trade.appspot.com",
	messagingSenderId: "543591832352",
	appId: "1:543591832352:web:a46c673583497de57b1545",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);
