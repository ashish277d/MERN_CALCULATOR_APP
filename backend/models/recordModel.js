const mongoose = require('mongoose')

const recordSchema = mongoose.Schema(
    {
        operation_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Operation',
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        amount: {
            type: Number,
        },
        user_balance: {
            type: Number,
        },
        operation_response: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Record', recordSchema)