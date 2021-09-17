const User = require('../models/User')
const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    await User.findByIdAndRemove(userId)
    return res.status(200).json({ success: true })
  } catch (error) {
    next(error)
  }
}

const getUser = async (req, res, next) => {
  try {
    const user = {
      name: req.user.name,
      sex: req.user.sex,
      avatar: req.user.avatar,
      email: req.user.email
    }

    return res.status(200).json({ user })

  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const userId = req.user._id
    await User.findByIdAndUpdate(userId, req.body)
    return res.status(200).json({ success: true })
  } catch (error) {
    next(error)
  }
}
module.exports = {
  deleteUser,
  getUser,
  updateUser
}