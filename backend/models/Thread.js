import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'assistant'],
        required: true
    },
    content: {
        type: String,
        required: true

    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
})
