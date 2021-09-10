const express = require('express')
const router = express.Router()
const boardCtr = require('../controllers/board')

router.route('/get-all-board').get(boardCtr.getAllBoard)
router.route('/get-board/:boardId').get(boardCtr.getBoard)
router.route('/add-board').post(boardCtr.createBoard)
router.route('/update-board/:boardId').patch(boardCtr.updateBoard)
router.route('delete-board/:boardId').delete(boardCtr.deleteBoard)


module.exports = router