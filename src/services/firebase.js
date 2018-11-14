import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import config from '../config/firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
};

export const auth = firebase.auth;
export const database = firebase.database;
export const storage = firebase.storage;