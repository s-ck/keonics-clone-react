import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC-j1Xb6rRqPZyYZOC-o9rtzVesou9QA6c",
  authDomain: "employe-7df87.firebaseapp.com",
  databaseURL: "https://employe-7df87-default-rtdb.firebaseio.com",
  projectId: "employe-7df87",
  storageBucket: "employe-7df87.appspot.com",
  messagingSenderId: "16250322037",
  appId: "1:16250322037:web:16b49c10b14d90d4ae0c3c"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth};