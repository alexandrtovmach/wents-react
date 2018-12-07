import { database } from './firebase';
import { userKeys } from './constants';
import { getUser } from './auth';
import { extractFromProvidersData } from './utils';

export const extendUserWithAdditionalData = (user) => {
  if (user && user.uid) {
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
    
    return database
      .ref(`users/${user.uid}`)
      .update({
        ...user
      });
  } else {
    throw new Error("Incorrect 'user' object provided in 'extendUserWithAdditionalData'")
  }
};

export const getUserAdditionalData = ({user, additionalUserInfo}) => {
  if (user && user.uid) {
    return database
      .ref(`users/${user.uid}`)
      .once('value')
      .then(snapshot => {
        const additional = snapshot.val() || {};
        return {
          ...user,
          ...additional,
          additionalUserInfo
        };
      })
  } else {
    return null
  }
};

export const getData = async (type, path = "", userId) => {
  userId = userId || (await getUser()).uid;
  return database
    .ref(`${type}/${userId}/${path}`)
    .once('value')
    .then(snapshot => snapshot.val())
};

export const getPublicData = async (type, path = "") => {
  return database
    .ref(`public/${type}/${path}`)
    .once('value')
    .then(snapshot => snapshot.val())
};

export const getDataByPath = (path) => {
  return database
    .ref(path)
    .once('value')
    .then(snapshot => ({
      [snapshot.key]: snapshot.val()
    }))
};

export const pushData = async (type, data, userId) => {
  userId = userId || (await getUser()).uid;
  const pathString = `${type}/${userId}`;
  data = {
    ...data,
    createdAt: Date.now()
  }
  return database
    .ref(pathString)
    .push(data)
    .then(snapshot => (data.publish && addToPublic(type, snapshot.key, data)) || snapshot.key)
};

export const updateData = async (type, key, data, userId) => {
  userId = userId || (await getUser()).uid;
  const pathString = `${type}/${userId}/${key}`;
  data = {
    ...data,
    updatedAt: Date.now()
  }
  return database
    .ref(pathString)
    .update({
      ...data,
      id: key
    })
    .then(() => data.publish && addToPublic(type, key, data))
    // .then(() => addTimestamp(type, `${pathString}`)) // add timestamp
};

export const addToPublic = async (type, key, data) => {
  return database
    .ref(`public/${type}/${key}`)
    .set({
      ...data,
      id: key
    })
    .then(() => key)
};

export const getLatestData = (type, limit) => {
  return database
    .ref(`public/${type}`)
    .orderByChild("updatedAt")
    .limitToLast(limit || 20)
    .once('value')
    .then(snapshot => snapshot.val())
};

export const getDataByPrice = async (type, parameters) => {
  const {
    minPrice,
    maxPrice
  } = parameters;
  return database
    .ref(`public/${type}`)
    .orderByChild("price")
    .startAt(minPrice)
    .endAt(maxPrice)
    .once('value')
    .then(snapshot => snapshot.val())
};