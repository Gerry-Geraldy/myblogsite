import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'


firebase.initializeApp({
  apiKey: "AIzaSyDn2nInaVmc560sPZjeMzfi_4jJx4tSO6U",
  authDomain: "myblogsite-9930a.firebaseapp.com",
  projectId: "myblogsite-9930a",
  storageBucket: "myblogsite-9930a.appspot.com",
  messagingSenderId: "63925416917",
  appId: "1:63925416917:web:41f3e1fdc021b3388b835c",
  measurementId: "G-BX98BQH225",
  storageBucket:"myblogsite-9930a.appspot.com"
});

const fb = firebase;

export default fb;