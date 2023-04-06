import mongoose from 'mongoose'

const BoardScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  columns: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Column'
      }
    ]
  }
})

export const Board = mongoose.model('Board', BoardScheme)
