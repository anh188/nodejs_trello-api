const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dueDate: { type: Date },
  cover: { type: String },
  attachments: [{ type: String }],
  // listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: 'BoardList', required: true }
})

const Card = mongoose.model('Card', cardSchema)

module.exports = Card