import { database } from './firebase';
import { userKeys } from './constants';

export const extendUserWithAdditionalData = (user) => {
  const initialUserObj = {
    uid: user.uid,
    providerData: user.providerData || null
  };
  user = userKeys.reduce((prev, el) => {
    return {
      ...prev,
      [el]: user[el] || extractFromProvidersData(user, el) || null
    }
  }, initialUserObj);
  if (user && user.uid) {
    return database()
      .ref(`users/${user.uid}`)
      .update({
        ...user
      });
  } else {
    throw new Error("Incorrect 'user' object provided in 'extendUserWithAdditionalData'")
  }
};

export const getUserAdditionalData = ({user}) => {
  if (user && user.uid) {
    return database()
      .ref(`users/${user.uid}`)
      .once('value')
      .then(snapshot => {
        const additional = snapshot.val() || {};
        return {
          ...user,
          ...additional
        };
      })
  } else {
    return null
  }
};

export const extractFromProvidersData = (user, key) => {
  return user && user.providerData && user.providerData.reduce((prev, el) => {
    return prev || el[key]
  }, null);
};

