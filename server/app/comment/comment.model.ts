import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

export const Comment = mongoose.model('Comment', CommentSchema)
