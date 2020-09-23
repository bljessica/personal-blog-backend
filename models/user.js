const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        default: ''
    },
    avatarUrl: {
        type: String,
        default: ''
    }
})
 
module.exports.User = mongoose.model('User', userSchema);