import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBer2BChpSN3nN1601jj4_nbu3dYSf7vrQ",
    authDomain: "keonics-83514.firebaseapp.com",
    projectId: "keonics-83514",
    storageBucket: "keonics-83514.appspot.com",
    messagingSenderId: "889988397107",
    appId: "1:889988397107:web:039fb0bbc0a02834918b46"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  export { db, auth};