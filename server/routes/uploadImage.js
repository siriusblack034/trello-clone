const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = require('../helpers/fileHelpers')
const passport = require('passport')
const passportConfig = require('../middlewares/passport')


router.route('/').post(passport.authenticate('jwt', {
  session: false,
}), upload.single('avatar'), (req, res, next) => {
  res.status(200).json({ url: `${process.env.HOST_SERVER}/${req.file.path}` })
})

module.exports = router
