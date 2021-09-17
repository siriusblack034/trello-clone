const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcryptjs')
const UserSchema = new Schema({
  name: String,
  avatar: String,
  sex: {
    type: String,
    enum: ['nam', 'nu']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String,
  authGoogleID: {
    type: String,
    default: null
  },
  authFacebookID: {
    type: String,
    default: null
  },
  authType: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    default: 'local'
  },

})

UserSchema.pre('save', async function (next) {
  try {
    if (this.authType !== 'local')
      next()
    // Generate a salt
    const salt = await bcrypt.genSalt(10)
    //Generate password-hash = password old + salt
    const passwordHashed = await bcrypt.hash(this.password, salt)
    //Re-assign password hashed
    this.password = passwordHashed
    next()
  } catch (error) {
    next(error)
  }
})
UserSchema.methods.isValidPassword = async function (newPass) {
  try {
    return await bcrypt.compare(newPass, this.password)

  } catch (error) {
    throw new Error(error)
  }
}

const User = mongoose.model('User', UserSchema)
module.exports = User


//Passport Local

