import firebase from 'firebase/app';
import 'firebase/auth';

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

export {auth};
