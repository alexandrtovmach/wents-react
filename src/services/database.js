import { database } from './firebase';

export const extendUserWithAdditionalData = ({user}) => {
  user = {
    uid: user.uid,
    displayName: user.displayName || extractFromProvidersData(user, "displayName"),
    email: user.email || extractFromProvidersData(user, "email"),
    emailVerified: user.emailVerified,
    metadata: user.metadata,
    phoneNumber: user.phoneNumber || extractFromProvidersData(user, "phoneNumber"),
    photoURL: user.photoURL || extractFromProvidersData(user, "photoURL"),
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

export const extractFromProvidersData = (user, key) => {
  return user && user.providerData.reduce((prev, el) => {
    return prev || el[key]
  }, null);
};

