import { firestore } from './firebase';
import { getDataByPath, updateData } from './database';
import { get } from 'https';


export const subscribeToRef = (ref, callback) => {
  firestore.collection("chat")
    .doc(ref)
    .onSnapshot(doc => {
      callback(doc.data())
    });
}

export const createConversation = (userId1, userId2) => {
  return firestore.collection("chat")
    .add({
      participants: [userId1, userId2],
      // messages: []
    })
    .then(docRef => {
      return Promise.all([
        getDataByPath(`users/${userId1}/conversations`)
          .then(res => res.conversations || [])
          .then(prevConv => updateData("users", "conversations", [...prevConv, docRef.id], userId1, true)),
        getDataByPath(`users/${userId2}/conversations`)
          .then(res => res.conversations || [])
          .then(prevConv => updateData("users", "conversations", [...prevConv, docRef.id], userId2, true))
      ])
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

export const postMessageToConversation = (conversationId, userId1, userId2) => {
  return firestore.collection("chat")
    .doc(conversationId)
    .collection("messages")
    .get()
    // .add("0"),
    .then(snapshot => console.log(snapshot.docs))
    // .then((docRef) => {
    //   return Promise.all([
    //     getDataByPath(`users/${userId1}/conversations`)
    //       .then(res => res.conversations || [])
    //       .then(prevConv => updateData("users", "conversations", [...prevConv, docRef.id], userId1, true)),
    //     getDataByPath(`users/${userId2}/conversations`)
    //       .then(res => res.conversations || [])
    //       .then(prevConv => updateData("users", "conversations", [...prevConv, docRef.id], userId2, true))
    //   ])
    // })
    // .catch((error) => {
    //   console.error("Error adding document: ", error);
    // });
}

