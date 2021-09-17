const express = require('express')
const router = express.Router()
const boardCtr = require('../controllers/board')
const passport = require('passport')
const passportConfig = require('../middlewares/passport')
router.route('/get-all-board').get(passport.authenticate('jwt', {
  session: false,
}), boardCtr.getAllBoard)
router.route('/get-board/:boardId').get(boardCtr.getBoard)
router.route('/add-board').post(passport.authenticate('jwt', {
  session: false,
}), boardCtr.createBoard)
router.route('/update-board/:boardId').patch(boardCtr.updateBoard)
router.route('delete-board/:boardId').delete(boardCtr.deleteBoard)


module.exports = router