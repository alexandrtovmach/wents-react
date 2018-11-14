import { database } from './firebase';

export const extendUserWithAdditionalData = ({user}) => {
  user = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    metadata: user.metadata,
    phoneNumber: user.phoneNumber,
    providerData: user.providerData
  };
  if (user && user.uid) {
    return database()
      .ref(`users/${user.uid}`)
      .set({
        ...user
      });
  } else {
    throw new Error("Incorrect 'user' object provided in 'extendUserWithAdditionalData'")
  }
};

export const getUserAdditionalData = user => {
  if (user && user.uid) {
    return database()
      .ref(`users/${user.uid}`)
      .once('value')
      .then(snapshot => snapshot.val() || {})
  } else {
    return null
  }
};
