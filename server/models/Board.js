const mongoose = require('mongoose')
const Schema = mongoose.Schema
const boardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  background: {
    type: Object
  },
  star: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})
const Board = mongoose.model('Board', boardSchema)
module.exports = Board