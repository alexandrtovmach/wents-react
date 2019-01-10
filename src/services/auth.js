import { _auth, auth } from './firebase';
import { extendUserWithAdditionalData, getUserAdditionalData } from './database';

export const signUpWithEmailAndPassword = (email, password, lang) => {
  auth.languageCode = lang || "en_US";
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(getUserAdditionalData)
    .then(extendUserWithAdditionalData)
}

export const signInWithEmailAndPassword = (email, password, lang) => {
  auth.languageCode = lang || "en_US";
  return auth
    .signInWithEmailAndPassword(email, password)
    .then(getUserAdditionalData)
    .then(extendUserWithAdditionalData)
}

export const signInGoogle = (lang) => {
  auth.languageCode = lang || "en_US";
  const provider = new _auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/user.phonenumbers.read");
  provider.addScope("https://www.googleapis.com/auth/user.birthday.read");
  provider.addScope("https://www.googleapis.com/auth/user.addresses.read");
  return auth
    .signInWithPopup(provider)
    .then(getUserAdditionalData)
    .then(extendUserWithAdditionalData)
}

export const signInFacebook = (lang) => {
  auth.languageCode = lang || "en_US";
  const provider = new _auth.FacebookAuthProvider();
  provider.addScope('email');
  provider.addScope('user_birthday');
  provider.addScope('user_gender');
  provider.addScope('user_location');
  provider.addScope('user_photos');
  return auth
    .signInWithPopup(provider)
    .then(getUserAdditionalData)
    .then(extendUserWithAdditionalData)
}

export const linkWithGoogle = async (lang) => {
  auth.languageCode = lang || "en_US";
  const provider = new _auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/user.phonenumbers.read");
  provider.addScope("https://www.googleapis.com/auth/user.birthday.read");
  provider.addScope("https://www.googleapis.com/auth/user.addresses.read");
  return auth.currentUser
    .linkWithPopup(provider)
    .then(({user}) => extendUserWithAdditionalData(user))
    .catch(error => {
      console.log(error);
    });
}

export const linkWithFacebook = async (lang) => {
  auth.languageCode = lang || "en_US";
  const provider = new _auth.FacebookAuthProvider();
  provider.addScope('email');
  provider.addScope('user_birthday');
  provider.addScope('user_gender');
  provider.addScope('user_location');
  provider.addScope('user_photos');
  return auth.currentUser
    .linkWithPopup(provider)
    .then(({user}) => extendUserWithAdditionalData(user))
    .catch(error => {
      console.log(error);
    });
}

export const linkWithPhoneNumber = async (phone, captchaContainerId, lang) => {
  auth.languageCode = lang || "en_US";
  return auth.currentUser
    .linkWithPhoneNumber(phone, new _auth.RecaptchaVerifier(captchaContainerId))
    .catch(error => {
      console.log(error);
    });
}

export const phoneCodeVerification = (verificationInstance, code) => {
  return verificationInstance.confirm(code)
    .then(({user}) => extendUserWithAdditionalData(user))
    .catch(error => {
      console.log(error);
    });
}

export const signOut = () => {
  return auth.signOut();
}

export const getUser = () => {
  return new Promise(resolve => {
    auth.onAuthStateChanged(user => resolve({user}))
  })
    .then(getUserAdditionalData)
};
