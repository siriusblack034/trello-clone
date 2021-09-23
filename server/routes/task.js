const express = require('express')
const router = express.Router()
const taskCtr = require('../controllers/task')


router.route('/new-task').post(taskCtr.addNewTask)
router.route('/get-all').get(taskCtr.getAll)
router.route('/update-task/:taskId').patch(taskCtr.updateTask)

router.route('/delete-task/:taskId').delete(taskCtr.deleteTask)
router.route('/draggble').post(taskCtr.dragTask)

module.exports = router
