import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB28QP2C_r1sQ3W88RiBbWoe2Xneesgfyk",
  authDomain: "statshot-96f50.firebaseapp.com",
  databaseURL: "https://statshot-96f50-default-rtdb.firebaseio.com",
  projectId: "statshot-96f50",
  storageBucket: "statshot-96f50.appspot.com",
  messagingSenderId: "413597765450",
  appId: "1:413597765450:web:da0119ea80c206c6993bb3",
  measurementId: "G-ZMR5H81LGG"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;



//// Helper functions ////
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('halo-infinite').doc('xbl').collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

export async function getAllUsernames() {
  const snapshot = await firestore.collection('halo-infinite').doc('xbl').collection('users').get()
  return snapshot.docs.map(doc => doc.data().username);
}