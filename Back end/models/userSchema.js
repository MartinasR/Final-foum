const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        required:true,
        default: 'https://gladstoneentertainment.com/wp-content/uploads/2018/05/avatar-placeholder.gif',
    },
    password:{
        type:String,
        required:true
    },
    regTimestamp:{
        type:Number,
        required:true
    },
    themesCreated: {
        type: Number,
        required: true,
        default: 0
    },
    answers: {
        type: Number,
        required: true,
        default: 0
    }
})


module.exports = mongoose.model('userModel', userSchema)