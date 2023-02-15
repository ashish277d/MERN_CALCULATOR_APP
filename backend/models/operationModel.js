const mongoose = require('mongoose')

const operationSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Please add type of the operation'],
    },
    cost: {
        type: Number,
        required: [true, 'Please add cost of the operation'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Operation', operationSchema)