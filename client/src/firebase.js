import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyBkHDxVf-woq3WFM3yGn7EDt1F1jl3oDns",
  authDomain: "trello-clone-1d8e7.firebaseapp.com",
  databaseURL: "https://trello-clone-1d8e7-default-rtdb.firebaseio.com",
  projectId: "trello-clone-1d8e7",
  storageBucket: "trello-clone-1d8e7.appspot.com",
  messagingSenderId: "528288627237",
  appId: "1:528288627237:web:06dae4a167a32dabad1dcc",
  measurementId: "G-5G6JW10MQD"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp