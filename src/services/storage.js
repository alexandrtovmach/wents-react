import { storage } from './firebase';
import { getUser } from './auth';
import { generateHashWithDate } from './utils';

export const uploadImage = async (imageType, imageName, fileData, fileExt, userId) => {

  const getLink = (snapshot) => {
    return snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('File available at', downloadURL);
      return downloadURL;
    });
    // const { bucket, fullPath } = snapshot.metadata;
    // return `https://storage.googleapis.com/${bucket}/${encodeURIComponent(fullPath)}`
  }

  if (imageType && imageType && imageName && fileData && fileExt) {
    userId = userId || (await getUser()).uid;
    const ref = storage().ref().child(`${userId}/${imageType}/${imageName}-${generateHashWithDate()}.${fileExt}`);
    if (typeof fileData === "string") {
      return ref.putString(fileData, "base64", {contentType: "image/png"}).then(getLink);
    } else {
      return ref.put(fileData).then(getLink);
    }
  } else {
    throw new Error("Not provided all arguments to 'uploadImage()'")
  }
};