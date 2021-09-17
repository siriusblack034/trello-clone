/* import firebase from "../firebase";
import { store } from '../store'
const db = firebase.firebase_.database()
export const boardService = {
  writeBoard,
  getAllBoard,
  removeBoard,
  getBoard

}
function writeBoard(board) {
  const idUser = store.state.user.idUser
  db.ref(idUser + '/listBoard/' + board.id).set({
    name: board.name,
    background: board.background
  })

}
async function getAllBoard() {
  let list = []
  const idUser = store.state.user.idUser
  const snapshot = await db.ref(idUser + '/listBoard/').once('value')
  if (snapshot != -1) {
    snapshot.forEach(val => {
      list.push({
        id: val.key,
        name: val.val().name,
        background: val.val().background,
        listTask: val.val().listTask || []
      })
    })
  }
  return list
}
async function getBoard(id) {
  let board = ''
  const idUser = store.state.user.idUser
  const snapshot = await db.ref(idUser + '/listBoard/' + id).once('value')
  if (snapshot != -1) {
    board = {
      id: snapshot.key,
      ...snapshot.val()
    }
  }
  return board
}
function removeBoard(id) {
  console.log(id);
}



 */