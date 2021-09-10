const mongoose = require('mongoose')
const Schema = mongoose.Schema
const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  background: {
    type: Object,
    default: {}

  },
  description: {
    type: String
  },
  toDo: [{
    type: Object
  }],
  tags: [{
    type: String
  }],
  deck: {
    type: Schema.Types.ObjectId,
    ref: 'Deck'
  }

})
const Task = mongoose.model('Task', taskSchema)
module.exports = Task