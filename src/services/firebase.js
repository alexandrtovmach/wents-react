import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";
import config from '../config/firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
};



const _auth = firebase.auth;
const _database = firebase.database;
const _storage = firebase.storage;
const _firestore = firebase.firestore;
const auth = _auth();
const database = _database();
const storage = _storage();
const firestore = _firestore();
firestore.settings({
  timestampsInSnapshots: true
})

export {
  _auth,
  _database,
  _storage,
  _firestore,
  auth,
  database,
  storage,
  firestore
}