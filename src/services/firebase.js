import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import config from '../config/firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
};

export const auth = firebase.auth;
export const storage = firebase.storage;