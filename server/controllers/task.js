const Task = require('../models/Task')

const addNewTask = async (req, res, next) => {
  try {
    const newTask = await new Task(req.body)
    newTask.deck = req.body.deckId
    await newTask.save();
    return res.status(200).json({ task: newTask })
  } catch (error) {
    next(error)
  }
}
const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params

    await Task.findByIdAndRemove(taskId)

    return res.status(200).json({ success: true })
  } catch (error) {
    next(error)
  }

}
const getAll = async (req, res, next) => {
  try {
    const list = await Task.find({})
    return res.status(200).json({ list })
  } catch (error) {
    next(error)
  }

}
const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params
    const task = await Task.findById(taskId)
    await task.update(req.body)
    return res.status(200).json({ task })
  } catch (error) {
    next(error)
  }

}
const dragTask = async (req, res, next) => {
  try {
    const { tasks } = req.body
    if (tasks) {
      Promise.all(tasks.map(async (task, index) => {
        let id = task._id
        await Task.findByIdAndUpdate(id, { location: index })
      }))
    }
    return res.status(200).json({ message: '"draggble success!' })
  } catch (error) {
    next(error)
  }
}
module.exports = {
  addNewTask,
  deleteTask,
  updateTask,
  getAll,
  dragTask
}