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
  decks: [{
    type: Schema.Types.ObjectId,
    ref: 'Deck'
  }],
  star: {
    type: Boolean,
    default: false
  }
})
const Board = mongoose.model('Board', boardSchema)
module.exports = Board