import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import config from "../config/firebase.config";

const firebase = app.initializeApp({
  apiKey: "AIzaSyC1kyy9tFl6SEaS2m0m9z7cT4jhPIKcflY",
  authDomain: "portalbens-nextjs-hefesto.firebaseapp.com",
  projectId: "portalbens-nextjs-hefesto",
  storageBucket: "portalbens-nextjs-hefesto.appspot.com",
  messagingSenderId: "642850209298",
  appId: "1:642850209298:web:fa8e3421f009c068c622cb",
  measurementId: "G-RZ2EJG9596",
});

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const fieldValues = app.firestore.FieldValue;

// if (
//   window.location.hostname === "localhost" ||
//   window.location.hostname == "127.0.0.1"
// ) {
//   db.useEmulator("localhost", 8080);

//   console.log(
//     "Running local instance of Firestore, data will not persist to production database"
//   );
// }

// db.enablePersistence({
//   synchronizeTabs: true,
// });

export default firebase;
