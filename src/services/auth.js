import { auth } from './firebase';
import { extendUserWithAdditionalData, getUserAdditionalData } from './database';

export const signUp = (email, password, lang) => {
  auth().languageCode = lang || "en_US";
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then(getUserAdditionalData)
    .then(extendUserWithAdditionalData)
}

export const signIn = (email, password, lang) => {
  auth().languageCode = lang || "en_US";
  return auth()
    .signInWithEmailAndPassword(email, password)
    .then(getUserAdditionalData)
    .then(extendUserWithAdditionalData)
}

export const signInGoogle = (lang) => {
  auth().languageCode = lang || "en_US";
  const provider = new auth.GoogleAuthProvider();
  return auth()
    .signInWithPopup(provider)
    .then(getUserAdditionalData)
    .then(extendUserWithAdditionalData)
}

export const signInFacebook = (lang) => {
  auth().languageCode = lang || "en_US";
  const provider = new auth.FacebookAuthProvider();
  return auth()
    .signInWithPopup(provider)
    .then(getUserAdditionalData)
    .then(extendUserWithAdditionalData)
}

export const signOut = () => {
  return auth().signOut();
}

export const getUser = () => {
  return new Promise(resolve => {
    auth().onAuthStateChanged(user => resolve({user}))
  })
    .then(getUserAdditionalData)
};
