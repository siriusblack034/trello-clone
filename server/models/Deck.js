const mongoose = require('mongoose')
const Schema = mongoose.Schema
const deckSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board'
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }]

})
const Deck = mongoose.model('Deck', deckSchema)
module.exports = Deck