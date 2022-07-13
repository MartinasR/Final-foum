const mongoose = require('mongoose')
const Schema = mongoose.Schema

const themeSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    answers: {
        type: Number,
        required: true,
        default: 0
    },
    lastAnswer: {
        type: String,
        required: true,
        default: '-'
    },
    notification: {
        type: Boolean,
        required: true,
        default: false
    }
})


module.exports = mongoose.model('themeModel', themeSchema)