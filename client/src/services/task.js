/* import firebase from "../firebase";
import { store } from '../store'
const db = firebase.firebase_.database()
const idUser = store.state.user.idUser

export const taskManagement = {
  getAllTask,
  addNewTask,
}
async function addNewTask(task) {
  console.log('check');
  //push info task enter table task
  await db.ref(idUser + '/tasks/' + task.idTask).set({
    title: task.title,
    idBoard: task.idBoard
  })
  //push id task for board
  await db.ref(idUser + '/listBoard/' + task.idBoard + '/listTask').push().set(task.idTask)
}
async function getAllTask(idTask) {
  console.log(idTask);
  let list = []
  const snapshot = await db.ref(idUser + '/tasks/' + idTask).once('value')
  snapshot.forEach(val => {
    list.push({ id: val.key, ...val.val() })
  })
  return list
}
 */