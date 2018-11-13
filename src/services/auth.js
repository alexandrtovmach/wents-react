import firebase from "firebase/app";
import "firebase/auth";
import config from '../config/firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const signUp = (email, password, lang) => {
  firebase.auth().languageCode = lang || "en_US";
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export const signIn = (email, password, lang) => {
  firebase.auth().languageCode = lang || "en_US";
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export const signInGoogle = (lang) => {
  firebase.auth().languageCode = lang || "en_US";
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

export const signInFacebook = (lang) => {
  firebase.auth().languageCode = lang || "en_US";
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

export const signOut = () => {
  return firebase.auth().signOut();
}

export const getUser = () => {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(user => resolve(user))
  });
}