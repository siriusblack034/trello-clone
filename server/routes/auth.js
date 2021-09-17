const express = require('express')
const router = express.Router()
const authCtr = require('../controllers/auth')
const passport = require('passport')
const passportConfig = require('../middlewares/passport')




router.route('/sign-up').post(authCtr.signUp)
router.route('/sign-in').post(passport.authenticate('local', { session: false }), authCtr.signIn)
router.route('/google').post(passport.authenticate('google-plus-token', { session: false }), authCtr.authGoogle)
router.route('/facebook').post(passport.authenticate('facebook-token', { session: false }), authCtr.authFacebook)
router.route('/change-password').post(passport.authenticate('jwt',{session:false}),authCtr.changePassword)
router.route('/secret').get(passport.authenticate('jwt', {
  session: false,
}), authCtr.secret)

module.exports = router