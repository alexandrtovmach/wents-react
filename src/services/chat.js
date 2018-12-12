import { firestore } from './firebase';
// import { getUser } from './auth';


export const subscribeToRef = (userId, ref, callback) => {
  firestore.collection(userId)
    .doc(ref)
    .onSnapshot(doc => {
      callback(doc.data())
    });
}

