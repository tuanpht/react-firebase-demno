import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDvUbyPBJ1OUFsPrzOXYQQoyipuUzqFuEU',
  authDomain: 'react-firebase-demo-web.firebaseapp.com',
  databaseURL: 'https://react-firebase-demo-web.firebaseio.com',
  projectId: 'react-firebase-demo-web',
  storageBucket: '',
  messagingSenderId: '1013674118250',
};

firebase.initializeApp(config);

const auth = firebase.auth();
auth.useDeviceLanguage();

const db = firebase.database();

export {auth, db};
