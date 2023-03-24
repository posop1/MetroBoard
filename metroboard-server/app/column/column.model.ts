import mongoose from 'mongoose'

const ColumnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export const Column = mongoose.model('Column', ColumnSchema)
