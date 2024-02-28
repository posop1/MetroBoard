import mongoose from 'mongoose'

const ColumnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board'
    }
  },
  { timestamps: true }
)

export const Column = mongoose.model('Column', ColumnSchema)
