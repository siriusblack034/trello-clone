const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = require('../helpers/fileHelpers')
const userCtr = require('../controllers/user')
const passport = require('passport')
const passportConfig = require('../middlewares/passport')

router.route('/get-user').get(passport.authenticate('jwt', {
  session: false,
}), userCtr.getUser)
router.route('/updated').post(passport.authenticate('jwt', {
  session: false,
}), userCtr.updateUser)
router.route('/delete/:userId').post(userCtr.deleteUser)

module.exports = router
