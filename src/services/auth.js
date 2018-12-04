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
  provider.addScope("https://www.googleapis.com/auth/user.phonenumbers.read");
  provider.addScope("https://www.googleapis.com/auth/user.birthday.read");
  provider.addScope("https://www.googleapis.com/auth/user.addresses.read");
  return auth()
    .signInWithPopup(provider)
    .then(getUserAdditionalData)
    .then(extendUserWithAdditionalData)
}

export const signInFacebook = (lang) => {
  auth().languageCode = lang || "en_US";
  const provider = new auth.FacebookAuthProvider();
  provider.addScope('email');
  provider.addScope('user_birthday');
  provider.addScope('user_gender');
  provider.addScope('user_location');
  provider.addScope('user_photos');
  return auth()
    .signInWithPopup(provider)
    .then(getUserAdditionalData)
    .then(extendUserWithAdditionalData)
}

export const signInPhone = (phone, captchaContainerId, lang) => {
  auth().languageCode = lang || "en_US";
  window.recaptchaVerifier = new auth.RecaptchaVerifier(captchaContainerId);
  return auth().signInWithPhoneNumber(phone, window.recaptchaVerifier)
    .then(confirmationResult => {
      window.confirmationResult = confirmationResult;
      return confirmationResult;
    }).catch(error => {
      console.log(error);
    });
  // return auth()
  //   .signInWithPopup(provider)
  //   .then(getUserAdditionalData)
  //   .then(extendUserWithAdditionalData)
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
