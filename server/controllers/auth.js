
const User = require('../models/User')
const JWT = require('jsonwebtoken')

const encoded = (userID) => {
  return JWT.sign({
    iss: "Sirius",
    sub: userID,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 3)
  }, "trello-clone")
}


const authGoogle = async (req, res, next) => {
  const token = encoded(req.user._id)
  res.setHeader('Authorization', token)
  return res.status(200).json({ resources: true })

}
const authFacebook = async (req, res, next) => {
  const token = encoded(req.user._id)
  res.setHeader('Authorization', token)
  return res.status(200).json({ resources: true })

}
const signUp = async (req, res, next) => {
  const { name, sex, email, password } = req.body
  const avatar = req.body.avatar || ""

  const foundUser = await User.findOne({ email })
  if (foundUser) {
    return res.status(403).json({ error: "Email da ton tai!" })
  }
  const newUser = new User({ name, sex, avatar, email, password })
  const token = encoded(newUser._id)
  res.setHeader('Authorization', token)
  await newUser.save()
  return res.status(200).json({ success: true })
}
const signIn = (req, res, next) => {
  const token = encoded(req.user._id)
  res.setHeader('Authorization', token)
  return res.status(200).json({ resources: true })
};

const secret = (req, res, next) => {
  return res.status(200).json({ resources: true })
};

module.exports = {
  signUp,
  signIn,
  secret,
  authGoogle,
  authFacebook
}