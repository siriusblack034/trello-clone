/* import firebase from '../firebase.js'
export const fileUpload = {
  imageUpload
}
function imageUpload(data) {
  const storeRef = firebase.storage().ref(`${data.imageData.name}`).put(data.imageData)
  storeRef.on(`state_changed`, snapshot => {
    data.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  })

} */