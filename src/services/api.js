import { storage } from './firebase';
import { generateHashWithDate } from './utils';

export const uploadImage = (userId, imageType, imageName, fileData, fileExt) => {
  if (userId && imageType && imageType && imageName && fileData && fileExt) {
    const ref = storage().ref().child(`${userId}/${imageType}/${imageName}-${generateHashWithDate()}.${fileExt}`);
    ref.put(fileData).then((snapshot) => {
      console.log(snapshot);
      console.log('Uploaded a blob or file!');
    });
  } else {
    throw new Error("Not provided all arguments to 'uploadImage()'")
  }
};