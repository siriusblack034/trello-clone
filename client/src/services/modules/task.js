import api from '../api'

export default {
  newTask(task) {
    return api.post('tasks/new-task', task)
  },
  updateTask(task, idTask) {
    return api.patch(`tasks/update-task/${idTask}`, task)
  },
  deleteTask(idTask) {
    return api.delete(`tasks/delete-task/${idTask}`)
  },
}
