// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
// import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const apiKey = import.meta.env.VITE_FIREBASE_API_KEK
const userEmail = import.meta.env.VITE_FIREBASE_USER_EMAIL
const password = import.meta.env.VITE_FIREBASE_PASSWORD

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: 'chrome-extension-vocabulary.firebaseapp.com',
  databaseURL: 'https://chrome-extension-vocabulary-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chrome-extension-vocabulary',
  storageBucket: 'chrome-extension-vocabulary.appspot.com',
  messagingSenderId: '198515381620',
  appId: '1:198515381620:web:1202d73cd95bd03eeb0821',
  measurementId: 'G-KL9L2QB335'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
signInWithEmailAndPassword(auth, userEmail, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log('auth.token.email:', user.email)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage)
  });

// export const store = getFirestore(app)
export const db = getDatabase(app)
