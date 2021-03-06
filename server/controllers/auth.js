
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
  const user = {
    email: req.user.email,
    avatar: req.user.avatar.url,
    sex: req.user.sex,
    name: req.user.name
  }
  res.setHeader('Authorization', token)
  return res.status(200).json({
    user
  })

}
const authFacebook = async (req, res, next) => {
  const token = encoded(req.user._id)
  const user = {
    email: req.user.email,
    avatar: req.user.avatar.url,
    sex: req.user.sex,
    name: req.user.name
  }
  res.setHeader('Authorization', token)
  return res.status(200).json({ user })

}
const signUp = async (req, res, next) => {
  const { name, sex, email, password } = req.body
  const avatar = {
    url: sex == "nam" ? "https://crosspointe.com/wp-content/uploads/2020/09/avatar-male.jpg" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDEZ4I-pmXTea7WjywRkk5bQp3nTSxwEphfIoykACKhhDU9wXK6EBRqOHV540MG_KGOpM&usqp=CAU",
    address: 'web'
  }
  const foundUser = await User.findOne({ email })
  if (foundUser) {
    return res.status(403).json({ error: "Email da ton tai!" })
  }
  const newUser = new User({ name, sex, avatar, email, password })
  const token = encoded(newUser._id)
  res.setHeader('Authorization', token)
  await newUser.save()
  return res.status(200).json({ success: newUser })
}
const signIn = (req, res, next) => {
  try {
    const token = encoded(req.user._id)
    res.setHeader('Authorization', token)
    return res.status(200).json({ login: true })
  } catch (error) {
    next(error)
  }
};


const changePassword = async (req, res, next) => {
  try {
    const { newPass, oldPass } = req.body
    const user = req.user
    const isCorrect = await user.isValidPassword(oldPass)
    if (isCorrect) {
      user.password = newPass
      await user.save()
      return res.status(200).json({ message: "C???p nh???t m???t kh???u th??nh c??ng !" })
    }
    else {
      return res.status(417).json({ message: 'M???t kh???u kh??ng tr??ng kh???p !' })
    }
  } catch (error) {
    next(error)
  }
}

const secret = (req, res, next) => {
  var url = ''
  if (req.user.avatar.address == 'local') {
    url = req.user.avatar.url
  }
  else {
    url = req.user.avatar.url
  }
  return res.status(200).json({
    name: req.user.name,
    avatar: url,
    email: req.user.email,
    sex: req.user.sex
  })
};

module.exports = {
  signUp,
  signIn,
  secret,
  authGoogle,
  authFacebook,
  changePassword
}