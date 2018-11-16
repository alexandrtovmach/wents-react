import { database } from './firebase';
import { userKeys } from './constants';
import { getUser } from './auth';

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

export const getData = async (type, path = "", userId) => {
  userId = userId || (await getUser()).uid;
  return database()
    .ref(`${type}/${userId}/${path}`)
    .once('value')
    .then(snapshot => snapshot.val())
};

export const pushData = async (type, data, userId) => {
  userId = userId || (await getUser()).uid;
  return database()
    .ref(`${type}/${userId}`)
    .push(data)
    .then(snapshot => snapshot.key)
};

export const updateData = async (type, path, data, userId) => {
  userId = userId || (await getUser()).uid;
  return database()
    .ref(`${type}/${userId}/${path}`)
    .update(data)
};

export const extractFromProvidersData = (user, key) => {
  return user && user.providerData && user.providerData.reduce((prev, el) => {
    return prev || el[key]
  }, null);
};

