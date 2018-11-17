import { database } from './firebase';
import { userKeys } from './constants';
import { getUser } from './auth';
import { extractFromProvidersData } from './utils';

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

export const getDataByPath = (path) => {
  return database()
    .ref(path)
    .once('value')
    .then(snapshot => ({
      [snapshot.key]: snapshot.val()
    }))
};

export const pushData = async (type, data, userId) => {
  userId = userId || (await getUser()).uid;
  const pathString = `${type}/${userId}`;
  return database()
    .ref(pathString)
    .push(data)
    .then(snapshot => (
      addTimestamp(type, `${pathString}/${snapshot.key}`)
        .then(() => snapshot.key)
    ))
};

export const updateData = async (type, path, data, userId) => {
  userId = userId || (await getUser()).uid;
  const pathString = `${type}/${userId}/${path}`;
  return database()
    .ref(pathString)
    .update(data)
    // .then(() => addTimestamp(type, `${pathString}`)) // add timestamp
};

export const addTimestamp = (type, path) => {
  const now = Date.now();
  return database()
    .ref(`timestamps/${type}/${now}`)
    .set(path)
    .then(() => now)
};

export const getLatestData = (type, limit) => {
  return database()
    .ref(`timestamps/${type}`)
    .orderByKey()
    .limitToLast(limit || 20)
    .once('value')
    .then(snapshot => snapshot.val())
    .then(stamps => Object.keys(stamps).reverse().map(time => stamps[time]))
    .then(paths => Promise.all(paths.map(path => getDataByPath(path))))
    .then(list => list.reduce((prev, el) => ({...prev,...el}), {}))
};