import { firestore } from './firebase';
import { getDataByPath, updateData } from './database';


export const subscribeToRef = (ref, callback) => {
  firestore.collection("chat")
    .doc(ref)
    .collection("messages")
    .onSnapshot(messagesCollection => {
      callback({
        changes: messagesCollection.docChanges(),
        full: {
          [ref]: messagesCollection.docs.map(queryDoc => queryDoc.data())
        }
      })
    });
}

export const createConversation = (userId1, userId2, subject) => {
  return firestore.collection("chat")
    .add({
      participants: [userId1, userId2],
      subject: subject || "No subject",
      createdAt: Date.now()
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

export const postMessageToConversation = (conversationId, senderId, receiverId, text, systemMessageId) => {
  const message = systemMessageId? {
    type: 'system',
    systemMessageId: systemMessageId,
    sender: senderId,
    receiver: receiverId,
    createdAt: Date.now(),
    text: text,
  } : {
    sender: senderId,
    receiver: receiverId,
    createdAt: Date.now(),
    text: text
  };

  return firestore.collection("chat")
    .doc(conversationId)
    .collection("messages")
    .add(message)
}

export const getConversationDetails = (conversationId) => {
  return firestore.collection("chat")
    .doc(conversationId)
    .get()
    .then(docRef => docRef.data())
    .then(data => {
      return data && data.participants && Promise.all(data.participants.map(id => getDataByPath(`users/${id}`)))
        .then(participants => ({
          ...data,
          participants: participants && participants.reduce((prev, el) => ({...prev, ...el}), {}),
        }))
    })
}
