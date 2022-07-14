const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    sender:{
        type:String,
        required:true
    },
    answer: {
        type: String,
        required: true,
    },
    item: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('answerModel', answerSchema)