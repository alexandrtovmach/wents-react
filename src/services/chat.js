import { firestore } from './firebase';
// import { getUser } from './auth';


export const subscribeToRef = (ref, callback) => {
  firestore.collection(ref).onSnapshot(callback);
}